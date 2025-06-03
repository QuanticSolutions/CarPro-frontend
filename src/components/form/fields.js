function getFields(category) {
    switch(category) {
        case "bikes": 
            return [
                "manufacturer",
                "wheels",
                "engine_capacity",
                "number_of_cylinders",
                "vehicle_condition"
            ]
        case "boats": 
            return [
                "length",
                "number_of_cylinders",
                "vehicle_condition"
            ]
        case "plates": 
            return [
                "length"
            ]
        default:
            return [
                "model",
                "engine_capacity",
                "number_of_cylinders",
                "regional_specs",
                "body",
                "seats",
                "transmission",
                "fuel",
                "horsepower",
                "doors",
                "steering_wheel",
                "vehicle_condition",
            ]
    }
}

export default getFields