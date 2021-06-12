module.exports = (app) => {

    return async(req, res) => {

        console.log(req.params.key)

        let filtered = await req.app.service('activation_endpoint').find({ query: {key: req.params.key} });

        let activation = filtered.data.pop()

        if (activation) {

            let user = await req.app.service('users').patch(activation.userId, { active: true });

            if (user.active) {
                res.redirect('/activated.html')
            } else {
                res.redirect('/error.html')
            }

        } else {
            res.redirect('/error.html')
        }

    }

}; 