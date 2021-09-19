"use strict";

module.exports = {
    apps: [{
        "name": "App",
        "cwd": "./",
        "watch": ["server"],
        "script": "./server/server.js",
        "out_file": "./logs/server-out.log",
        "error_file": "./logs/server-err.log",
        "log_date_format": "MMMM Do YYYY, h:mm:ss a",
        "min_uptime": 10000,
        "max_restarts": 3,
        "ignore_watch": ["server/bin", "server/output", "server/static", "server/.*"],
        "exec_mode": "cluster",
        "instances": 1,
        "kill_timeout" : 8000,
        "wait_ready": true
    }]
}