function getFilterOptions(category, t) {
    switch (category) {
        case "bikes":
            return [
                {
                    title: t("filters.filters.Exterior Color"),
                    options: ["White", "Black", "Silver", "Blue", "Gold"].map(color => t(`filters.options.${color}`)),
                    field: "exteriorColor"
                },
                {
                    title: t("filters.filters.Manufacturer"),
                    options: [
                        t('cardValues.AccessMotor'),
                        t('cardValues.Aprillia'),
                        t('cardValues.Asiawing'),
                        t('cardValues.BMW'),
                        t('cardValues.Bajaj'),
                        t('cardValues.Benelli'),
                        t('cardValues.Buell'),
                        t('cardValues.Can-am'),
                        t('cardValues.Ducati'),
                        t('cardValues.Fantic'),
                        t('cardValues.Gas Gas'),
                        t('cardValues.Harley Davidson'),
                        t('cardValues.Hero'),
                        t('cardValues.Honda'),
                        t('cardValues.Husaberg'),
                        t('cardValues.Husqvarna'),
                        t('cardValues.Indian'),
                        t('cardValues.KTM'),
                        t('cardValues.Kawasaki'),
                        t('cardValues.MV Agusta'),
                        t('cardValues.Moto Guzzi'),
                        t('cardValues.Norton'),
                        t('cardValues.Polaris'),
                        t('cardValues.Royal Enfield'),
                        t('cardValues.Sharmax'),
                        t('cardValues.Suzuki'),,
                        t('cardValues.Triumph'),
                        t('cardValues.Vespa'),
                        t('cardValues.Victory'),
                        t('cardValues.Yamaha'),
                        t('cardValues.Other')
                    ],
                    field: "manufacturer"
                },
                {
                    title: t("filters.filters.Wheels"),
                    options: ["2", "3", "4"].map(type => t(`filters.options.${type}`)),
                    field: "wheels"
                },
                {
                    title: t("filters.filters.Seller Type"),
                    options: ["Owner", "Dealer"].map(type => t(`filters.options.${type}`)),
                    field: "sellerType"
                },
                {
                    title: t("filters.filters.Fuel Type"),
                    options: ["Diesel", "Electric", "Gasoline"].map(ft => t(`filters.options.${ft}`)),
                    field: "fuelType"
                }
            ];
        case "boats":
            return [
                {
                    title: t("filters.filters.Exterior Color"),
                    options: ["White", "Black", "Silver", "Blue", "Gold"].map(color => t(`filters.options.${color}`)),
                    field: "exteriorColor"
                },
                {
                    title: t("filters.filters.Doors"),
                    options: ["2", "4", "6"].map(door => t(`filters.options.${door}`)),
                    field: "doors"
                },
                {
                    title: t("filters.filters.Seller Type"),
                    options: ["Owner", "Dealer"].map(type => t(`filters.options.${type}`)),
                    field: "sellerType"
                },
                {
                    title: t("filters.filters.Fuel Type"),
                    options: ["Diesel", "Electric", "Gasoline"].map(ft => t(`filters.options.${ft}`)),
                    field: "fuelType"
                }
            ]
        case "plates":
            return [];
        default:
            return [
                {
                    title: t("filters.filters.Transmission"),
                    options: ["Automatic", "Manual"].map(option => t(`filters.options.${option}`)),
                    field: "transmission"
                },
                {
                    title: t("filters.filters.Exterior Color"),
                    options: ["White", "Black", "Silver", "Blue", "Gold"].map(color => t(`filters.options.${color}`)),
                    field: "exteriorColor"
                },
                {
                    title: t("filters.filters.Body"),
                    options: [
                        "Crossover", "SUV", "Sedan", "Coupe", "Hard Top Convertible", "Pick Up Truck"
                    ].map(body => t(`filters.options.${body}`)),
                    field: "body"
                },
                {
                    title: t("filters.filters.Doors"),
                    options: ["2", "4", "6"].map(door => t(`filters.options.${door}`)),
                    field: "doors"
                },
                {
                    title: t("filters.filters.Seller Type"),
                    options: ["Owner", "Dealer"].map(type => t(`filters.options.${type}`)),
                    field: "sellerType"
                },
                {
                    title: t("filters.filters.Seats"),
                    options: ["2", "4", "5", "6", "7", "8"].map(seat => t(`filters.options.${seat}`)),
                    field: "seats"
                },
                {
                    title: t("filters.filters.Steering Wheel"),
                    options: ["Right", "Left"].map(sw => t(`filters.options.${sw}`)),
                    field: "steeringWheel"
                },
                {
                    title: t("filters.filters.Fuel Type"),
                    options: ["Diesel", "Electric", "Gasoline"].map(ft => t(`filters.options.${ft}`)),
                    field: "fuelType"
                }
            ];
    }
}

export default getFilterOptions;