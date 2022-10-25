import subscriptionService from '@services/subscriptionService'
import webpush from 'web-push';

const SubscriptionService = new subscriptionService();

class SubscriptionController {
    static async create(req, res) {
        const subscription = req.body;

        const data = {
            "aud": "https://some-push-service.org",
            "exp": "1469618703",
            "sub": "mailto:example@web-push-book.org"
        }

        webpush.sendNotification(subscription, "Custom message")
        .then(result => {
            console.log(result);
        }).catch((err) => {
            console.log(err);
        });

        res.send("OK");
    }

    async sendNotification(subscription, data) {
        console.log("SEND");
        
    }
}

export default SubscriptionController;