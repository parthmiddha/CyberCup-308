import keyword_extractor from 'keyword-extractor';
type AnnouncementData = {
    active: boolean;
    keyword: string;
    link: string;
    audio: string[];
    translate: string[];
    trainDetails: object;
}
import translate from '@iamtraction/google-translate';
import { Videos } from "../../models/videos.schema";
import { Running } from "../../models/running.schema";

async function translateMessage(message: string, language: string) {
    try {
        const res = await translate(message, { from:'en', to: language });
        return res.text;
    } catch (err) {
        console.error(err);
        return '';
    }
}

async function trainStatus(train_no: Number) {
    const url = `https://api.railwayapi.site/api/v1/trains/${train_no}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '54b99c1162msh780a7bd5aa1fc38p16b241jsnb96d9ad80ad2',
            'X-RapidAPI-Host': 'irctc1.p.rapidapi.com'
        }
    };

    const response = await fetch(url, options);
    const {data} = await response.json();
    return data ? data[0] : null;
}

export default eventHandler(async (event) => {
    const body = await readBody(event);
    const prompt = body.prompt;

    const keywords = keyword_extractor.extract(prompt, {
        language: "english",
        remove_digits: true,
        return_changed_case: true,
        remove_duplicates: false
    });
    
    const video = await Videos.findOne({
        keyword: {
            $in: keywords
        }
    }) as any;
 
    if (!video) {
        return {
            status: 404,
            body: {
                message: 'No video found',
            },
        }
    }

    await Running.updateMany({
        active: true
    }, {
        active: false
    });

    const videoLink = video.link.split(",").map((link: any) => {
        return {
            link,
        }
    });
    const videoRandom = videoLink[Math.floor(Math.random() * videoLink.length)];    
    const regex = prompt.match(/\b\d+\b/);
    const train_no = regex ? regex[0] : null;
    const train = train_no ? await trainStatus(train_no) : null;
    const Announcement = {
        active: true,
        keyword: video.keyword,
        link: videoRandom.link,
        audio: [
            `https://translate.google.com/translate_tts?ie=UTF-8&tl=en&client=tw-ob&q=${await translateMessage(prompt, 'en')}`,
            `https://translate.google.com/translate_tts?ie=UTF-8&tl=hi&client=tw-ob&q=${await translateMessage(prompt, 'hi')}`,
            `https://translate.google.com/translate_tts?ie=UTF-8&tl=ur&client=tw-ob&q=${await translateMessage(prompt, 'ur')}`,
            `https://translate.google.com/translate_tts?ie=UTF-8&tl=ta&client=tw-ob&q=${await translateMessage(prompt, 'ta')}`,
            `https://translate.google.com/translate_tts?ie=UTF-8&tl=te&client=tw-ob&q=${await translateMessage(prompt, 'te')}`,
        ],
        translate: [
            await translateMessage(prompt, 'en'),
            await translateMessage(prompt, 'hi'),
            await translateMessage(prompt, 'ur'),
            await translateMessage(prompt, 'ta'),
            await translateMessage(prompt, 'te'),
        ],
        trainDetails: {
            name: train ? train.trainName : null,
            number: train ? train.trainNumber : null,
            from: train ? train.stationFrom.stationName : null,
            to: train ? train.stationTo.stationName : null,
            arrival: train ? train.arrivalTime : null,
            depature: train ? train.departureTime : null,
        },
    }

    await Running.create({
        ...Announcement
    });
    return {
        status: 200,
        body: {
            Announcement,
            message: `Found video for the keyword ${video.keyword}`
        }
    }
});
