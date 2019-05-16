import AuthService from '../services/AuthService';

class AuthController {

    static loginPage(req, res) {
        let message = req.query.message;
        if(req.session.id) message = 'Ya estás logueado';
        res.render('login', {message});
    }

    static async login(req, res) {
        req.session.destroy();
        const user = req.body.username;
        const password = req.body.password;
        const userData = await AuthService.login(user, password);

        if(!userData[0]) res.redirect('/auth/login?message=usuario+o+password+equivocados');

        req.session.userId = userData[0].id;
        res.redirect('/');
    }
}

export default AuthController;
