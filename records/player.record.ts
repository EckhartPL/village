import { FieldPacket } from 'mysql2';
import { v4 as uuid } from 'uuid';
import { pool } from '../utils/db';

type playerRecordType = [PlayerRecord[], FieldPacket[]]

export class PlayerRecord {
    public id?: string;
    name: string;
    password: string;

    constructor(obj: Omit<PlayerRecord, 'insert' | 'update'>) {
        const {id, name, password} = obj;

        this.id = id ?? uuid();
        this.name = name;
        this.password = password;
    }

    async update(id: string): Promise<void> {
        pool.execute(
            "UPDATE `player` SET `name` = :name WHERE id = :id", {
            name: this.name,
            id,
        })
    }

    async insert(): Promise<string> {
        if (this.id === 'undefined') {
            this.id = uuid();
        }

        await pool.execute(
            "INSERT INTO `resource` VALUES (:id, :gold, :wood, :stone, :villager);", {
                id: this.id,
                gold: 0,
                wood: 0,
                stone: 0,
                villager: 1,
            });

        await pool.execute(
            "INSERT INTO `player` VALUES (:id, :name, :password, :resourceid);", {
            id: this.id,
            name: this.name,
            password: this.password,
            resourceid: this.id,
        });

        return this.id;
    }

    static async listAll(): Promise<PlayerRecord[]> {
        const [results] = 
        await pool.execute(
            "SELECT `name` FROM `player`") as playerRecordType;

        return results.map(obj => new PlayerRecord(obj));
    }

    static async getOne(id: string): Promise<PlayerRecord | null> {
        const [results] = 
        await pool.execute(
            "SELECT `name`, `vitality`, `strength`, `defence` FROM `village` WHERE `id` = :id;", {
                id,
            }) as playerRecordType;

            return results.length === 0 ? null : new PlayerRecord(results[0]);
    }

    static async listTop(topCount: number): Promise<PlayerRecord[]> {
        const [results] = 
        await pool.execute(
            "SELECT `name`, `vitality`, `strength`, `defence` FROM `village` ORDER BY `name` DESC LIMIT :topCount;", {
                topCount,
            }) as playerRecordType;

            return results.map(obj => new PlayerRecord(obj));
    }
}