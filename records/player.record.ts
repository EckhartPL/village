import { FieldPacket } from 'mysql2';
import { v4 as uuid } from 'uuid';
import { pool } from '../utils/db';

interface TopPlayers {
    name: string,
    gold: number,
    wood: number,
    stone: number,
};

type playerRecordType = [PlayerRecord[], FieldPacket[]];
type topPlayers = [TopPlayers[], FieldPacket[]];

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

    async insert(): Promise<string | null> {
        if (this.id === 'undefined') {
            this.id = uuid();
        }

        const [results] = await pool.execute(
            "SELECT `name` FROM `player` WHERE `name` = :name;", {
                name: this.name,
            }
        ) as playerRecordType;

        try {
            if (results[0].name === this.name) { 
                console.log(results[0].name, this.name);      
                return null;
            }
        } catch (e) {
            console.log(e);
        }

        await pool.execute(
            "INSERT INTO `resource` VALUES (:id, :gold, :wood, :stone, :villager, :villagerlimit);", {
                id: this.id,
                gold: 0,
                wood: 0,
                stone: 0,
                villager: 1,
                villagerlimit: 3,
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

    async getOne(): Promise<PlayerRecord | null> {
        const [results] = 
        await pool.execute(
            "SELECT * FROM `player` WHERE `name` = :name AND `password` = :password;", {
                name: this.name,
                password: this.password,
            }) as playerRecordType;

            return results.length === 0 ? null : new PlayerRecord(results[0]);
    }

    static async list(): Promise<TopPlayers[]> {
        const [results] = 
        await pool.execute(
            "SELECT player.name, resource.gold FROM `player` INNER JOIN `resource` ON player.id = resource.id ORDER BY resource.gold DESC;") as topPlayers;

            return results;
    }

    static async listTop(topCount: number): Promise<TopPlayers[]> {
        const [results] = 
        await pool.execute(
            "SELECT player.name, resource.gold, resource.wood, resource.stone FROM `player` INNER JOIN `resource` ON player.id = resource.id ORDER BY resource.gold DESC LIMIT :topCount;", {
                topCount,
            }) as topPlayers;

            return results;
    }
}