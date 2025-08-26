import {DocumentsService} from "./documentsService.ts";
import {Client} from "pg";
import {SLACK_TOKEN} from "../utils/variables.ts";
import {WebClient} from "@slack/web-api";

export class SlackService {

    private readonly documentService: DocumentsService;
    private readonly slackClient?: WebClient;

    constructor(client: Client) {
        this.documentService = new DocumentsService(client);

        if (SLACK_TOKEN) {
            this.slackClient = new WebClient(SLACK_TOKEN);
        }
    }

    async sendDocumentToSlackChannel(documentId: number, channelId: string): Promise<void> {
        if (!this.slackClient) {
            throw new Error(`slack token not set. can't send document to slack channel`);
        }

        const document = await this.documentService.getDocumentById(documentId);

        await this.slackClient.chat.postMessage({
            channel: channelId,
            unfurl_links: false,
            unfurl_media: false,
            text: `Resolution Discussion - ${document.name}`,
            blocks: [
                {
                    "type": "header",
                    "text": {
                        "type": "plain_text",
                        "text": `:rose: ${document.name}`,
                        "emoji": true
                    }
                },
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": `*Authors*\n${document.coauthors.join(', ')}`
                    }
                },
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": `*Summary*\n>${document.description}`
                    }
                },
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": `View and sign the resolution on the :globe_with_meridians: *<https://convention.stldsa.org/?document=${document.id}|Local Convention Hub>*. Discuss the resolution here.`
                    }
                },
            ]
        });
    }
}