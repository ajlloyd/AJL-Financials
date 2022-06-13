import React from 'react'
import { Button } from 'react-bootstrap'
import {AiFillHome} from "react-icons/ai"
import styles from "../../styles/Documentation.module.scss"

const documentation = () => {
  return (
    <div className={styles.container}>


        
        
        

      <table className={styles.table}>
        <tbody>
          <tr key="ddd">
            <td><Button className={styles.homeButton} variant="danger" href='/'> <AiFillHome/> Home </Button></td>
            <td><h1 className={styles.titleText}> Documentation</h1></td>
            <td></td>
          </tr>
        </tbody>
      </table>



      <div className={styles.contentContainer}>

        <h3 id={styles.docSubtitle}>Background</h3>
        <ul>
          <li>AJL Financials is a project developed by Aaron Lloyd Development</li>
          <li>This site is built with the NextJS framework for React</li>
          <li>Data is provided by <a href='https://www.alphavantage.co/'>Alpha Vantage API</a> and the <a href='https://iexcloud.io/docs/api/'>IEX Cloud Finance API</a></li>

        </ul>

        <h3 id={styles.docSubtitle}>Usage</h3>
        <ul>
          <li>This tool is aimed at those wishing to perform fundemental analysis of stocks </li>
          <li>The metrics provided will assist users in determining if a stock is a buy or a sell </li>
          <li>Some understanding of stock analysis and economics is required to get the most out of this tool </li>
        </ul>

        <h3 id={styles.docSubtitle}>Guide</h3>
        <ol>
          <li id={styles.listText}>On the Home page you are can see an input box where a stock ticker can be typed:</li>
          <img id={styles.listImage} src='/stepOne.png'/>
          <li id={styles.listText}>Up to five tickers can be added and searched for. See example below using Microsoft (MSFT) and Alphabet (GOOGL):</li>
          <img id={styles.listImage} src='/stepThree.png'/>
          <li id={styles.listText}>Once you have input the tickers you wish to compare, click Submit and allow 30 seconds per ticker for the API to run:</li>
          <img id={styles.listImage} src='/stepFour.png'/>
          <li id={styles.listText}>Once complete you will be met with the comparison report as below:</li>
          <img id={styles.listImage} src='/stepFive.png'/>
          <li id={styles.listText}>The comparison report contains a number of financial analysis metrics including PE ratio, Net Profit Growth, Altman Z-Score and many more</li>
          <li id={styles.listText}>The data can then be interpreted by the user, depending on which metrics they value most for their investing style, to assist them in making a better informed descision</li>
          <li id={styles.listText}>In order to assist the user information icons have been added which give an explanation of each metric: </li>
          <img id={styles.listImage} src='/stepSix.png'/>
          <li id={styles.listText}>Finally, users can toggle Dark Mode at the top which is easier on the eyes in low light: </li>
          <img id={styles.listImage} src='/stepSeven.png'/>
        </ol>


        <h3 id={styles.docSubtitle}>Issues</h3>
        <ul>
          <li>Certain well known tickers return undefined and cause application to error. These include: </li>
          <ul>
            <li>Tencent (TCEHY)</li>
            <li>Nestlé (NSRGY)</li>
            <li>Roche (RHHBY)</li>
          </ul>
          <li>Certain companies return strange icons (due to the nature of the web scraper used) i.e. Johnson and Johnson (JNJ) </li>
        </ul>


        <h3 id={styles.docSubtitle}>Planned Updates</h3>
        <ul>
          <li>Adding API keys with no request limits to speed up the processing of data </li>
          <li>Adding logic so undefined tickers will not cause entire analysis run to error out</li>
          <li>Adding visualisation for data (via Chart.js) </li>
          <li>Finishing the info buttons for all metrics </li>
        </ul>


      </div>

      <div className={styles.footer}>
          <small>Copyright Aaron Lloyd Development © </small>
          <small>Version 22.3</small>

      </div>


    </div>
  )
}

export default documentation