let ReE = function (res, code, msg, error) {
    let send_data = { success: false, status: code, message: msg, error: error };

    return res.status(code).json(send_data);
};

let ReS = function (res, code, msg, data, token) {
    let send_data = {
        success: true,
        status: code,
        message: msg,
        token: token,
        data: data
    };
    return res.status(code).json(send_data);
};
let returnOP = {
    success: function (response, statusCode, message, data, token) {
        let returnData = { status: true, statusCode: statusCode, message: message };
        if (data != undefined || data != null) {
            returnData["data"] = data;
        }
        if (token != undefined || token != null) {
            returnData["token"] = token;
        }
        return response.status(statusCode).json(returnData);
    },
    fail: function (response, statusCode, message, error) {
        let returnData = {
            status: false,
            statusCode: statusCode,
            message: message
        };
        if (error != undefined || error != null) {
            returnData["error"] = error;
        }
        return response.status(statusCode).json(returnData);
    }
};
