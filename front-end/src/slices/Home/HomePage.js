import React from 'react';
import { Row, Col } from 'react-bootstrap';

export const HomePage = () => (
    <Row>
    <Col lg={3} className='details-left'>
    <div className='page-header'>
    <h1>Home Page</h1>
</div>
</Col>

    <Col lg={{span: 7, offset: 0}} className='home-content'>
    <div className='home-body'>
    <h2>What is Climate Change?</h2>
    <p max-width="1em">
        From shifting weather patterns that threaten food production, to rising sea levels that increase the risk of catastrophic flooding, the impacts of climate change are global in scope and unprecedented in scale.
        Without drastic action today, adapting to these impacts in the future will be more difficult and costly.
    </p>
    <h2>Causes of Climate Change</h2>

    <h2>Effects of Climate Change</h2>

    <h2>Possible solutions</h2>
    <h2>What you can do to help</h2>
    <h4>Useful Resources</h4>
    <iframe width="560" height="315"
    src="https://www.youtube.com/embed/G4H1N_yXBiA" frameborder="0"
    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
    </iframe>
    <iframe width="560" height="315"
    src="https://www.youtube.com/embed/yvDRQe2oCt4" frameborder="0"
    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
    </iframe>
    <footer>
    <p>All rights reserved</p>
    <p>Contact information: <a href="">HelpSaveOurPlantWithTrees@gmail.com</a></p>
    </footer>
</div>
</Col>
</Row>
)