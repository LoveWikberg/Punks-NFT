// export function getAvailableSkins() {
//     return fetch(`http://localhost:3333/list`)
//         .then(res => {
//             return res.json()
//         })
//         .catch(error => console.log(error));
// }

export const getMockBasePunk = () => {
    const imageBaseUri = '/testfiles';

    const basePunk = {
        background: `${imageBaseUri}/background/1.png`,
        beard: `${imageBaseUri}/beard/8.png`,
        clothing: `${imageBaseUri}/clothing/8.png`,
        nose: `${imageBaseUri}/nose/1.png`,
        eyes: `${imageBaseUri}/eyes/11.png`,
        mouth: `${imageBaseUri}/mouth/8.png`,
        head: `${imageBaseUri}/head/18.png`,
    };

    return basePunk;
}

export const getMockBasePunkImage = () => {
    const imageBaseUri = '/testfiles/testbasepunk.png';

    return imageBaseUri;
}

export const getMockSkins = () => {
    const imageBaseUri = '/testfiles';

    // const mockData = [
    //     {
    //         background: `${imageBaseUri}/background/17.png`,
    //         beard: `${imageBaseUri}/beard/1.png`,
    //         clothing: `${imageBaseUri}/clothing/3.png`,
    //         ear: `${imageBaseUri}/ear/3.png`,
    //         nose: `${imageBaseUri}/nose/1.png`,
    //         eyes: `${imageBaseUri}/eyes/10.png`,
    //         mouth: `${imageBaseUri}/mouth/7.png`,
    //         head: `${imageBaseUri}/head/7.png`,
    //         necklace: '',
    //     },
    //     {
    //         background: `${imageBaseUri}/background/2.png`,
    //         beard: `${imageBaseUri}/beard/4.png`,
    //         clothing: `${imageBaseUri}/clothing/1.png`,
    //         ear: `${imageBaseUri}/ear/2.png`,
    //         nose: `${imageBaseUri}/nose/1.png`,
    //         eyes: `${imageBaseUri}/eyes/17.png`,
    //         mouth: `${imageBaseUri}/mouth/3.png`,
    //         head: `${imageBaseUri}/head/1.png`,
    //         necklace: '',
    //     }
    // ];

    const mockData = [
        {
            name: 'Wage Punks',
            description: 'Get back to work!',
            image: '/testfiles/testbasepunk.PNG',
        },
        {
            name: 'Nostagia Punks',
            description: 'It was better before...',
            image: '/testfiles/testbasepunk.PNG',
        },
        {
            name: 'Project#3',
            description: 'Lorem ipsum dolor sit amet...',
            image: '/testfiles/testbasepunk.PNG',
        },
        {
            name: 'Project#4',
            description: 'Lorem ipsum dolor sit amet...',
            image: '/testfiles/testbasepunk.PNG',
        }, 
        {
            name: 'Project#5',
            description: 'Lorem ipsum dolor sit amet...',
            image: '/testfiles/testbasepunk.PNG',
        },
        {
            name: 'Project#6',
            description: 'Lorem ipsum dolor sit amet...',
            image: '/testfiles/testbasepunk.PNG',
        },
    ]

    return mockData;
}