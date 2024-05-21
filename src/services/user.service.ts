import { ModelStatic } from 'sequelize';
import User from '../database/models/User';
import resp from '../utils/resp';
import { sign } from '../jwt/jwt';

class UserService {
    private model: ModelStatic<User> = User;

    async get() {
        const users = await this.model.findAll();
        return resp(200, users);
    }

    async login(body: { email: string, password: string }) {
        const user = await this.model.findOne({
            where: {
                email: body.email,
                password: body.password
            }
        });

        if(!user) return resp(404, { message: 'User not found!' });

        const { id, email } = user as User;

        const token = sign({ id, email });

        return resp(200, { id, email, token });
    }
}

export default UserService;