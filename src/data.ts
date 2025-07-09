export interface Email {
    message_id: number;
    sender: string;
    recipients: string[];
    subject: string;
    body: string;
    timestamp: string;
    status: 'unread' | 'read' | 'archived'; // Add more status options as needed
    attachments: string[];
    labels: string[];
    importance: 'low' | 'medium' | 'high';
    thread_id: number;
  }
  
  export const emails: Email[] = [
    {
        message_id: 1,
        sender: 'arthur.dent@earthling.net',
        recipients: ['ford.prefect@hitchhikers.com'],
        subject: 'Towel Reminder',
        body: 'Hi Ford, don\'t forget your towel! We might need it for intergalactic hitchhiking. Meet at the pub at 8 PM.',
        timestamp: '2023-11-20 09:45:00',
        status: 'unread',
        attachments: [],
        labels: ['hitchhiking', 'urgent'],
        importance: 'high',
        thread_id: 1
    },
    {
        message_id: 2,
        sender: 'ford.prefect@hitchhikers.com',
        recipients: ['arthur.dent@earthling.net', 'trillian@astrophysicist.com'],
        subject: 'Re: Towel Reminder',
        body: "Arthur, thanks for the reminder. I've got my towel ready Vogon poetry might be less painful with it!",
        timestamp: '2023-11-20 10:30:00',
        status: 'unread',
        attachments: ['https://vooma-interviews.s3.us-east-2.amazonaws.com/invite.rtf'],
        labels: ['hitchhiking', 'preparations'],
        importance: 'medium',
        thread_id: 1
    },
    {
        message_id: 3,
        sender: 'zaphod.beeblebrox@president.gov',
        recipients: ['arthur.dent@earthling.net', 'ford.prefect@hitchhikers.com'],
        subject: 'Presidential Invitation: Zaphod\'s Party',
        body: "Hey Earthlings, I'm throwing a party at the Heart of Gold. You're invited. Don\'t forget your party hats!",
        timestamp: '2023-11-20 12:15:00',
        status: 'unread',
        attachments: ['https://vooma-interviews.s3.us-east-2.amazonaws.com/invite.rtf'],
        labels: ['party', 'urgent'],
        importance: 'high',
        thread_id: 2
    },
    {
        message_id: 4,
        sender: 'trillian@astrophysicist.com',
        recipients: ['arthur.dent@earthling.net', 'ford.prefect@hitchhikers.com'],
        subject: 'Re: Re: Towel Reminder',
        body: 'Arthur, I might join you at the pub. Haven\'t had a good pint since leaving Earth. See you there!',
        timestamp: '2023-11-20 14:00:00',
        status: 'unread',
        attachments: [],
        labels: ['social', 'hitchhiking'],
        importance: 'medium',
        thread_id: 1
    },
    {
        message_id: 5,
        sender: 'marvin@robotics.ai',
        recipients: ['arthur.dent@earthling.net'],
        subject: 'Existential Crisis Alert',
        body: 'I suppose I\'ll come to the pub too, not that it matters. Life, don\'t talk to me about life.',
        timestamp: '2023-11-20 15:30:00',
        status: 'unread',
        attachments: [],
        labels: ['existential', 'pub'],
        importance: 'low',
        thread_id: 3
    },
  ] 