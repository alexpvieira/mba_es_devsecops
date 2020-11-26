enum Environments {
    local = 'local',
    dev = 'dev',
    prod = 'prod'
}

class Environment {
    private environment: String

    constructor(environment: String) {
        this.environment = environment
    }

    getPort(): Number {
        if (this.environment === Environments.prod) {
            return 8081
        } 
        else if (this.environment === Environments.dev) {
            return 8082
        } 
        else {
            return 3000
        }
    }

    getDBName(): String {
        if (this.environment === Environments.prod) {
            return 'db_prod'
        } 
        else if (this.environment === Environments.dev) {
            return 'db_dev'
        } 
        else {
            return 'db_local'
        }
    }

    getDBUsername(): String {
        return 'db_user'
    }

    getDBPassword(): String {
        return 'dark1610'
    }
}

export default new Environment(Environments.local)