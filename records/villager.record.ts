import { FieldPacket } from 'mysql2';
import { v4 as uuid } from 'uuid';
import { pool } from '../utils/db';

type VillagerRecordType = [VillagerRecord[], FieldPacket[]]

export class VillagerRecord {
    public id?: string;
    name: string;
    vitality: number;
    strength: number;
    defence: number;
    constructor(obj: Omit<VillagerRecord, 'insert' | 'update'>) {
        const {id, name, vitality, strength, defence} = obj;

        this.id = id ?? uuid();
        this.name = name;
        this.vitality = vitality;
        this.strength = strength;
        this.defence = defence;
    }

    async update(id: string): Promise<void> {
        pool.execute(
            "UPDATE `villager` SET `strength` = :strength WHERE id = :id", {
            strength: this.strength++,
            id,
        })
    }

    async insert(): Promise<string> {
        if (this.id === 'undefined') {
            this.id = uuid();
        }
        await pool.execute("INSERT INTO `villager` VALUES (:id, :name, :vitality, :strength, :defence);", {
            id: this.id,
            name: this.name,
            vitality: this.vitality,
            strength: this.strength,
            defence: this.defence,
        });

        return this.id;
    }

    static async listAll(): Promise<VillagerRecord[]> {
        const [results] = 
        await pool.execute(
            "SELECT `name`, `vitality`, `strength`, `defence` FROM `village`") as VillagerRecordType;

        return results.map(obj => new VillagerRecord(obj));
    }

    static async getOne(id: string): Promise<VillagerRecord | null> {
        const [results] = 
        await pool.execute(
            "SELECT `name`, `vitality`, `strength`, `defence` FROM `village` WHERE `id` = :id;", {
                id,
            }) as VillagerRecordType;

            return results.length === 0 ? null : new VillagerRecord(results[0]);
    }

    static async listTop(topCount: number): Promise<VillagerRecord[]> {
        const [results] = 
        await pool.execute(
            "SELECT `name`, `vitality`, `strength`, `defence` FROM `village` ORDER BY `name` DESC LIMIT :topCount;", {
                topCount,
            }) as VillagerRecordType;

            return results.map(obj => new VillagerRecord(obj));
    }
}