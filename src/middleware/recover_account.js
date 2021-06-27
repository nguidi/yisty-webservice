module.exports = (app) => {

    return async(req, res) => {

        console.log(req.params.key)

        console.log(req.query)

        let filtered = await req.app.service('password_recovery').find({ query: {key: req.params.key} });

        let toRecover = filtered.data.pop()

        if (toRecover) {

            filtered = await req.app.service('users').find({ query: { email: toRecover.email } }); 

            let userToRecover = filtered.data.pop()

            if (userToRecover) {

                let user = await req.app.service('users').patch(userToRecover.id, { password: req.query.password });

                await req.app.service('password_recovery').remove(toRecover.id);

                if (user) {
                    res.send("OK")
                } else {
                    res.redirect('/error.html')
                }

            } else {
                res.redirect('/error.html')
            }

        } else {
            res.redirect('/error.html')
        }

    }

}; 