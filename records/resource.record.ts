import {v4 as uuid} from 'uuid';
import { pool } from '../utils/db';

export class ResourceRecord {
    public id: string;
    public gold: number;
    public wood: number;
    public stone: number;
    public villager: number;

    constructor(obj: Omit<ResourceRecord, 'update'>){
        const {id, gold, wood, stone, villager} = obj;

        this.id = id ?? uuid();
        this.gold = gold;
        this.wood = wood;
        this.stone = stone;
        this.villager = villager;
    }

    async update(id: string): Promise<void> {
        await pool.execute(
            "UPDATE `recource` SET `gold` = :gold, `wood` = :wood, `stone` = :stone, `villager` = :villager WHERE `id` = :id;", {
            gold: this.gold,
            wood: this.wood,
            stone: this.stone,
            villager: this.villager,
            id,
        })
    }
}