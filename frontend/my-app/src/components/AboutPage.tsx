import React from 'react';
import { Link } from "react-router-dom";

const AboutPage: React.FC = () => {
    $(function() {
        $(".accordion").accordion({header:"h3",icons: { "header": "ui-icon-plus", "activeHeader": "ui-icon-minus" } });
    });
    return (
        <div className="about-page">
            <h1>About Me</h1>
            <p>
                Hello, I'm Collin Stasiak, a passionate web developer with a foundation in programming and development.
                I am currently 21 years old and on my way to graduating from my associates program this spring.
            </p>
            <p>
                My journey in web development began when [mention how you got into web development or any interesting story]. Since then, I've been dedicated to learning and honing my skills in various web technologies.
            </p>
            <p>
                I have a strong interest in [mention your areas of interest or specialization, e.g., frontend development, backend development, etc.], and I am always excited to take on new challenges and projects.
            </p>

            <h2>Skills</h2>
            <ul>
                <li>JavaScript (ES6+)</li>
                <li>React</li>
                <li>Node.js</li>
                <li>HTML/CSS</li>
                <li>Neovim User BTW</li>
            </ul>

            <h2>Projects</h2>
            <p>
                I have worked on a variety of projects during my journey, including:
            </p>
            <ul className="accordion">
                <li><h3>This blog!</h3>
                    <p>This site is built with Typescript and react for the frontend, and was actually my introduction to react as I use angular for my current job.
                        The backend uses Python's Flask library because sometimes simple is just better. While probably not necessary for a project of this size, I implemented a CMS (Content Management System)
                        using sqlite as my database engine. The flask server encapsulates all of the database logic and exposes some API routes to allow the front-end to grab data for blog posts.
                        Mainly this project serves as an example of everything I've learned working thus far and because I thought it would be cool to host my own blog instead of using medium.
                    </p>
                </li>
                <li><h3>OSRS Exchange Tracker</h3>
                    <p>Another website this time using Python's Django library along with a postgre database.

                        One challenge I faced here was that I had never built my own database before this project and I was struggling to come up with a solution to store,
                        time series data and store hierachical data where object of the item class could have further item classes attached to them. I wanted to be able to query the children to find their parent and vice versa
                        After taking a class on SQL in my time at TRI-C the answer smacked me in the face and I scrapped the clunky json storage method I had been using and replaced it with a proper database,
                        normalized to the third form which allowed querying to be made much simpler I just made a table key'd by the combination of a parent and it's child. Querying children would just mean finding every instance of the parent object in that table.
                    </p>
                </li>
                <li><h3>C# Audio Processing Library</h3>
                    <p>I decided to mess around with C# after I was forced to use it in school and I probably won't be returning to it anytime soon
                        atleast not for personal projects, but it did help me demonstrate and apply a solid(see what I did there) understanding of Object Oriented Programmming principles
                        My first learning objective with this project was just to learn how to process raw bytes to format them into different audio file types. I began with converting 16bit .wavs to 32 and 64 bit.
                        Afterwards I translated some common effects to code to create some electric audio processing functions. Currently the program supports, EQing(with several types availiable), Distortion, and Reverberation.
                        It was a fun project that prioritized effcient code because of the pure amount of operations required to process audio.
                    </p>
                </li>
                {/* Add more project descriptions as needed */}
            </ul>

            <h2>Education</h2>
            <p>
                <ul>
                    <li> Highschool - Hawken </li>
                    <li>Associates - Tri-c Programming and Development</li>
                </ul>
            </p>
            <h2>Work Experience</h2>
            <ul>
                <li>2018-2021 - Line Cook at Aladdin's Eatery</li>
                <li>2021-2022 - Line Cook at 17 River Grille</li>
                <li>2021 - Present - Web Dev at RSM US LLP</li>
            </ul>

            <h2><Link to="/contact/">Contact Me</Link></h2>
        </div>
    );
};

export default AboutPage;
