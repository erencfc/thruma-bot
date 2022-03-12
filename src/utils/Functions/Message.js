export default (client) => {
    client.message = {
        deleteMsg: (message, timeout = 5000) => {
            setTimeout(() => {
                try {
                    if (message.deletable) message.delete();
                } catch (error) {
                    console.log(
                        chalk.red(`! Error  (function: deleteMsg) - ${error}`)
                    );
                }
            }, timeout);
        },
    };
};
