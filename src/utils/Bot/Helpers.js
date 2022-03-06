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
    };
};
