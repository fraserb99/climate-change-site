import React from 'react';
import ReactDOM from "react-dom";
import Carousel from 'react-bootstrap/Carousel'
import { TwitterTimelineEmbed} from 'react-twitter-embed';

import Image from 'react-bootstrap/Image'
import {Row, Col, CarouselItem} from 'react-bootstrap';


export const HomePage = () => (
    <Row>
    <Col lg={3} className='details-left'>
    <div className='page-header'>
</div>
</Col>


    <Col lg={{span: 12, offset: 0}} className='home-content'>
    <div className='home-body'>
    <h1 className='tree-title'></h1>
        <Carousel>
        <CarouselItem interval={2000}>
            <img src={require('../Home/koala.jpg')} width={400} height={250}/>
        </CarouselItem>
        <CarouselItem interval={2000}>
            <img src={require('../Home/polar.jpg')} width={400} height={250}/>
        </CarouselItem>
        <CarouselItem interval={2000}>
            <img src={require('../Home/panda.jpg')} width={400} height={250}/>
        </CarouselItem>
        <CarouselItem interval={2000}>
            <img src={require('../Home/turtle.jpg')} width={400} height={250}/>
        </CarouselItem>
        </Carousel>


    <h2 className='subsections'>Who are we?</h2>
    <p className='paragraphs'>
    United Tree Front(UTF) are climate change activists that believe in changing the world by planting more trees to reduce CO2 emissions into the atmosphere.
    We take pride in the effort we make in making a global impact on climate change and you can start helping today. Any discussion you would like to have head
    on over to our forums.
    </p>
    <h2 className='subsections'>What is Climate Change?</h2>
    <p className='paragraphs'>
        From shifting weather patterns that threaten food production, to rising sea levels that increase the risk of catastrophic flooding, the impacts of climate change are global in scope and unprecedented in scale.
        Without drastic action today, adapting to these impacts in the future will be more difficult and costly. Find out more below:
    </p>
    <p>
        <iframe width="420" height="245"
                src="https://www.youtube.com/embed/eHMLszamZ9w" frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen>
        </iframe>
    </p>
    <h2 className='subsections'>Causes of Climate Change</h2>
    <p className='paragraphs'>
        Burning of fossil fuels produces a buildup of material in the air known as "greenhouse gasses", carbon dioxide, methane etc.
        Greenhouse gasses trap heat from the sun in the planet, like a greenhouse!, with the result being the planet begins to warm.
        While the temperature increase may seem minute, a couple of degrees, the impact is profound.
        Below are two graphs demonstrating the impact mankind is having on the environment.
        The first shows the trend that overall area sea ice is decreasing.
        The second shows the huge rise in wildfire coverage each year, devastating animal habitats and human homes.
    </p>
    <h2 className='subsections'>Effects of Climate Change</h2>
    <p className='paragraphs'>
    Climate change is crippling the world that we live in, if nothing is done to combat the rapid changes to our planet
    this will have serious implications to our daily lives. The ice caps are melting at an accelerated rate,
        resulting in rising sea levels which are removing not only animal habitats but viable human living areas.
        The increased planet temperatures also results in more forest fires.

    </p>
    <p>
        <img src={require('../Home/arctic-ice.png')} width={400} height={250}/>
        &emsp;&ensp;
        <img src={require('../Home/forest-fire.png')} width={400} height={250}/>
        </p>
    <p className='paragraphs'>
        Look at the wanton devastation wrought by mankind:
    </p>
       <p>
           <img src={require('../Home/ForestFire.jpg')} width={400} height={250}/>
           &emsp;&ensp;
           <img src={require('../Home/ForestFireII.jpg')} width={400} height={250}/>

       </p>

    <h2 className='subsections'>What you can do to help</h2>
    <p className='paragraphs'>
        In times like these it can seem like there is nothing you can do, the scale of the problem is just too big.
        However, you can make a difference and it's not as hard as you think.
        When you leave the house, make sure all your appliances are off, properly seperate your rubbish,
        support local companies who are environmentally friendly.
        These may seem like small changes but if everyone makes the effort then we can stop climate change.
    </p>
    <h2 className='subsections'>What's Going on around the world about climate change</h2>
    <p className='videos'>


    <iframe width="325" height="200"
    src="https://www.youtube.com/embed/G4H1N_yXBiA" frameborder="0"
    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen>
    </iframe>
    <iframe width="325" height="200"
    src="https://www.youtube.com/embed/yvDRQe2oCt4" frameborder="0"
    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen>
    </iframe>
    <iframe width="325" height="200"
    src="https://www.youtube.com/embed/vpTHi7O66pI" frameborder="0"
    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen>
    </iframe>
    <iframe width="325" height="200"
    src="https://www.youtube.com/embed/oJAbATJCugs" frameborder="0"
    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen>
    </iframe>
    </p>
        <p className='twitter'>
            <TwitterTimelineEmbed
                sourceType="profile"
                screenName="UNFCCC"
                options={{height: 820, width:550}}
            />
        </p>
    <p className='paragraphs'>Contact information: <a href="">HelpSaveOurPlantWithTrees@treemail.com</a></p>

</div>
</Col>
</Row>
)