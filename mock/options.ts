import config from "@/app/config"

export default {
    onUnhandledRequest: (request: any, print: any) => {
        if (request.url.hostname.includes(config.host)) {
            print.warning()
        }
    }
}