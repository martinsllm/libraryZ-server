import { ModelStatic } from 'sequelize';
import md5 from 'md5';
import { IUser } from '../interfaces/IUser';
import schema from './validation/schema';
import User from '../database/models/User';
import {resp, respM} from '../utils/resp';
import { sign } from '../jwt/jwt';

class UserService {
    private model: ModelStatic<User> = User;

    async get() {
        const users = await this.model.findAll();
        return resp(200, users);
    }

    async create(user: IUser) {
        const { error } = schema.user.validate(user);
        if(error) return respM(422, error.message);

        const createdUser = await this.model.create({
            ...user,
            password: md5(user.password)
        })

        return resp(201, createdUser);
    }

    async login(body: { email: string, password: string }) {
        const hash = md5(body.password);

        const user = await this.model.findOne({
            where: {
                email: body.email,
                password: hash
            }
        });

        if(!user) return respM(404, 'User not found!');
        const { id, email } = user as User;

        const token = sign({ id, email });
        return resp(200, { id, email, token });
    }
}

export default UserService;