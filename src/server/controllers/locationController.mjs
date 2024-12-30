import { openai } from "../utils.mjs";

export const fetchLocationData = async(req, res) => {
    try{
        const {city, hotel} = req.body;
        
        let prompt = `You are city explorer. 
        You are asked to provide the top 10 nearby sight-seeing locations based 
        on the city name ${city} and the hotel name ${hotel}.
        and generate the place name, discription and distance in kilometres, 
        Response should be in the text format, dont mention as an AI model in heading,
        Note: dont provide any extra information other than the requested information.`;

        const response = await openai.chat.completions.create({
            messages: [
              { role: "system", content: 'You are city explorer' },
              { role: "user", content: prompt }
            ],
            model: "gpt-3.5-turbo-16k",
          });
        const result = response.choices[0].message.content.trim();
        return res.status(200).json({message: 'Location information fetched successfully', result})
    }
    catch(err){
        console.log(err)
        res.status(500).json({message: 'Failed to fetch location information'})
        throw err;
    }
}  