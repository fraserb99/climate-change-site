import React from 'react';
import ReactDOM from "react-dom";
import Carousel from 'react-bootstrap/Carousel'
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
    <h1 className='tree-title'>United Tree Front</h1>
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
    United Tree Front are climate change activists that believe in changing the world by planting more trees to reduce CO2 emissions into the atmosphere.
    We take pride in the effort we make in making a global impact on climate change and you can start helping today. Any discussion you would like to have head
    on over to our forums.
    </p>
    <h2 className='subsections'>What is Climate Change?</h2>
    <p className='paragraphs'>
        From shifting weather patterns that threaten food production, to rising sea levels that increase the risk of catastrophic flooding, the impacts of climate change are global in scope and unprecedented in scale.
        Without drastic action today, adapting to these impacts in the future will be more difficult and costly.
    </p>
    <h2 className='subsections'>Causes of Climate Change</h2>
    <p className='paragraphs'>

    </p>
    <h2 className='subsections'>Effects of Climate Change</h2>
    <p className='paragraphs'>
    Climate change is cripling the world that we live in, if nothing is done to combat the rapid changes to our planet
    this will have serious implications to our daily lifes. This is what forrests should look like:
    </p>

    <h2 className='subsections'>Possible solutions</h2>
    <p className='paragraphs'>

    </p>
    <h2 className='subsections'>What you can do to help</h2>
    <p className='paragraphs'>

    </p>
    <h2 className='subsections'>Videos on climate change</h2>
    <p className='paragraphs'>


    <iframe width="420" height="245"
    src="https://www.youtube.com/embed/G4H1N_yXBiA" frameborder="0"
    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
    </iframe>
    <iframe width="420" height="245"
    src="https://www.youtube.com/embed/yvDRQe2oCt4" frameborder="0"
    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
    </iframe>
    <iframe width="420" height="245"
    src="https://www.youtube.com/embed/vpTHi7O66pI" frameborder="0"
    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
    </iframe>
    <iframe width="420" height="245"
    src="https://www.youtube.com/embed/oJAbATJCugs" frameborder="0"
    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
    </iframe>
    </p>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <p>
        <a className="twitter-timeline" data-lang="en" data-theme="dark"
           href="https://twitter.com/UNFCCC?ref_src=twsrc%5Etfw">Tweets by UNFCCC</a>
        <script async src="https://platform.twitter.com/widgets.js" charSet="utf-8"></script>
    </p>
    <footer>
    <p>Contact information: <a href="">HelpSaveOurPlantWithTrees@treemail.com</a></p>
    </footer>
</div>
</Col>
</Row>
)