import { ModelStatic } from 'sequelize';
import User from '../database/models/User';
import resp from '../utils/resp';
import { sign } from '../jwt/jwt';
import { IUser } from '../interfaces/IUser';
import md5 from 'md5';



class UserService {
    private model: ModelStatic<User> = User;

    async get() {
        const users = await this.model.findAll();
        return resp(200, users);
    }

    async create(user: IUser) {
        const userCreated = await this.model.create({
            ...user,
            password: md5(user.password)
        })

        return resp(201, userCreated);
    }

    async login(body: { email: string, password: string }) {
        const hash = md5(body.password);

        const user = await this.model.findOne({
            where: {
                email: body.email,
                password: hash
            }
        });

        if(!user) return resp(404, { message: 'User not found!' });

        const { id, email } = user as User;

        const token = sign({ id, email });

        return resp(200, { id, email, token });
    }
}

export default UserService;