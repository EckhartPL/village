import { v4 as uuid } from 'uuid';
import { pool } from '../utils/db';

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
        })

        return this.id;
    }
}