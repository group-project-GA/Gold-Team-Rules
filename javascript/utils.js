const validateForm = (form, fields) => {
    let i, l = fields.length;
    let fieldname;
    let result = [];
    let isValid = true;
    for (i = 0; i < l; i++) {
        fieldname = fields[i];
        if (form[fieldname].value === "") {
            isValid = false;
            result.push({
                [fieldname]: {
                    message: `${fieldname} can not be empty`
                }
            })
        }
    }
    return [isValid, result];
}
