import { FieldPacket } from 'mysql2/promise';
import { v4 as uuid } from 'uuid';
import { pool } from '../utils/db';

type resourceRecordType = [ResourceRecord[], FieldPacket[]];

export class ResourceRecord {
    public id?: string;
    public gold: number;
    public wood: number;
    public stone: number;
    public villager: number;
    public villagerlimit: number;

    constructor(obj: Omit<ResourceRecord, 'update'>) {
        const { id, gold, wood, stone, villager, villagerlimit } = obj;

        this.id = id ?? uuid();
        this.gold = gold;
        this.wood = wood;
        this.stone = stone;
        this.villager = villager;
        this.villagerlimit = villagerlimit;
    }

    async update(): Promise<void> {
        await pool.execute(
            "UPDATE `resource` SET `gold` = :gold, `wood` = :wood, `stone` = :stone, `villager` = :villager, `villagerlimit` = :villagerlimit WHERE `id` = :id;", {
            gold: this.gold,
            wood: this.wood,
            stone: this.stone,
            villager: this.villager,
            villagerlimit: this.villagerlimit,
            id: this.id,
        })
    }

    static async getOne(id: string): Promise<ResourceRecord | null> {
        const [results] = 
        await pool.execute(
            "SELECT `gold`, `wood`, `stone`, `villager`, `villagerlimit` FROM `resource` WHERE `id` = :id", {
                id,
            }) as resourceRecordType;

        return results.length === 0 ? null : new ResourceRecord(results[0]);
    }
}