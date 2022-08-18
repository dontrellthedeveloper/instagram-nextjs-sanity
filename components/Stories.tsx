import React, {useEffect, useState} from 'react';
import { faker } from '@faker-js/faker';
import Story from "./Story";


const Stories = () => {
    const [suggestions, setSuggestions]: any = useState([]);

    useEffect(()=> {
        const suggestions = [...Array(20)].map((_, i) => ({
            // ...faker.helpers.contextualCard(),
            id: i,
            name: faker.name.firstName(),
            username: faker.internet.userName(),
            avatar: faker.internet.avatar(),
            email: faker.internet.email(),
            dob: faker.date.birthdate(),
            phone: faker.phone.number(),
            address: {
                street: faker.address.streetAddress(false),
                suite: faker.address.secondaryAddress(),
                city: faker.address.city(),
                zipcode: faker.address.zipCode(),
                state: faker.address.state(),
                geo: faker.address.nearbyGPSCoordinate()
            },
            website: faker.internet.domainName(),
            company: {
                name: faker.company.companyName(),
                catchPhrase: faker.company.catchPhraseNoun(),
                bs: faker.company.bs()
            }
        }));

        console.log(suggestions);
        setSuggestions(suggestions);
    },[])
    return (
        <div className='flex space-x-2 p-6 bg-white mt-8 border-gray-200 border rounded-sm overflow-x-scroll scrollbar-thin scrollbar-thumb-black'>
            {suggestions.map((profile: any) => (
                <Story key={profile.id} img={profile.avatar} username={profile.username}
                />
            ))}

        </div>
    );
}

export default Stories;