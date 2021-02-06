function omitParams(data, params) {

    params.forEach(param => {

        delete data[param];

    });

    return data;

}

module.exports = function (paramsToRemove) {
    
    return function (context) {

        if (context.method == 'get') {
            
            context.result = omitParams(context.result, paramsToRemove);

        } else {

            let data = Array.isArray(context.result) ? context.result : context.result.data;    // Por si no se esta paginando
            
            context.result.data = data.map(result => {

                result = omitParams(result, paramsToRemove);

                return result;

            });

        }

        return context
      
    };

};