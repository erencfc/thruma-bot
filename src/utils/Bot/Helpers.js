import prettyMs from "pretty-ms";

export default (client) => {
    client.helpers = {
        firstCaseUpper: function (str) {
            let s = `${str}`;
            s = s.toLowerCase();
            return s.charAt(0).toUpperCase() + s.slice(1);
        },
        sleep: (ms) => {
            return new Promise((resolve) => setTimeout(resolve, ms));
        },
        pretty: (time) => {
            let pretty = prettyMs(time, { verbose: true });
            if (pretty.includes(".")) {
                let index = pretty.indexOf(".");
                pretty =
                    pretty.substring(0, index) + pretty.substring(index + 2);
            }

            pretty = pretty.replace("days", "gün");
            pretty = pretty.replace("day", "gün");
            pretty = pretty.replace("hours", "saat");
            pretty = pretty.replace("hour", "saat");
            pretty = pretty.replace("minutes", "dakika");
            pretty = pretty.replace("minute", "dakika");
            pretty = pretty.replace("seconds", "saniye");
            pretty = pretty.replace("second", "saniye");
            pretty = pretty.replace("milliseconds", "milisaniye");
            pretty = pretty.replace("millisecond", "milisaniye");
            pretty = pretty.replace("millisaniye", "milisaniye");

            return pretty;
        },
    };
};
