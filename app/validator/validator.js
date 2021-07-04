const validateRequest = async(schema, requestObj) => {
    const options = {
        allowUnknown: true,
        stripUnknown: true
    };
    const result = await schema.validateAsync(requestObj, options);
    return result;
}

module.exports = { validateRequest };