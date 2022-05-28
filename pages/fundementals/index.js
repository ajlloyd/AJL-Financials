import React, {useEffect, useState} from 'react';
import { GetServerSideProps } from 'next'
//import fetch from 'node-fetch'
import styles from "../../styles/StockTable.module.scss"
import Link from 'next/link'
import { useRouter } from 'next/router'
import {BsArrowUp, BsArrowDown, BsBackspace, BsSunFill, BsMoonFill} from "react-icons/bs"
import {AiFillHome} from "react-icons/ai"
import Button from 'react-bootstrap/Button'
import OverlayStockTable from '../../components/OverlayStockTable'
import Graphy from '../../components/Graphy'
var Scraper = require('images-scraper');




const Index = (props, {income}) => {

    const router = useRouter();
    const tickerPayloadObject = router.query;
    const tickerPayloadArray = Object.values(tickerPayloadObject)
    //console.log(tickerPayloadArray)

    const grossProfitProps = props.grossProfitAll
    const netProfitProps = props.netProfitAll
    const profitMarginProps = props.netProfitMarginAll

    const [darkMode, setDarkMode] = useState(false);

    const handleDarkMode = (e) => {
        if (darkMode){
            setDarkMode(false)
            console.log("Dark Mode Activated")
        } else {
            setDarkMode(true)
            console.log("Dark Mode Deactivated")
        } 
    }
        
    return (
        <div className={darkMode ? [styles.metaContainer, styles.darkModeScheme].join(" ") : styles.metaContainer}>
            <div className={styles.headComponents}>
                
                <Link href='/'>
                    <Button className={styles.homeButton} variant="danger"> <AiFillHome/> Home </Button>
                </Link>

                <h2 className={styles.outputTitle}>Comparison Report</h2>
                <Button className={styles.darkMode} variant="primary" onClick={() => handleDarkMode()}>  {darkMode ?  <><BsSunFill/> Disable Dark Mode</> : <><BsMoonFill/> Enable Dark Mode</>} </Button>
            </div>

            

            <div className={styles.container}>
                <table>
                    <tbody>



                        {/* Stock Ticker Header -------------------------------------------------------------------------------------------------------------------------------------------*/}
                        <tr id={styles.headerRow}><td>Stock Ticker:</td>
                        {tickerPayloadArray.map((x, i) => {
                        return (
                        <td key={`dynamicTickerHeader${i}`}>{x}</td>)
                        })}</tr>

                        {/*<Graphy/>*/}

                        {/* Image */}

                        <tr id={styles.imageRow}><td></td>
                        {tickerPayloadArray.map((x, i) => {
                        return (
                        <td key={`logo${i}`}>
                            <img id={styles.logoImage} src={props.logoImages[i]} />
                        </td>)
                        })}</tr>

                        {/* Stock Name */}
                        <tr id={styles.whiteRow}><td>Name</td>
                        {tickerPayloadArray.map((x,i) => {
                            return(
                                <td key={`name${i}`}>{props.priceData[i]["shortName"]}</td>)
                        })}</tr>

                        {/* Stock Sector */}
                        <tr id={styles.whiteRow}><td>Sector</td>
                        {tickerPayloadArray.map((x,i) => {
                            return(
                                <td key={`sector${i}`}>{props.overviewData[i]["Sector"]}</td>)
                        })}</tr>


                        {/* Analyst Rating  */}
                        <tr id={styles.whiteRow}><td>Average Analyst Rating</td>
                        {tickerPayloadArray.map((x,i) => {
                            return(
                                <td key={`Rating${i}`}>{props.priceData[i]["averageAnalystRating"]}</td>)
                        })}</tr>    


                        {/* Current Info Header -----------------------------------------------------------------------------------------------------------------------*/}
                        <tr id={styles.headerRow}><td>Current Stock Info</td>
                        {tickerPayloadArray.map((x,i) => {
                            return(
                                <td key={`CurrentStockInfo${i}`}></td>)
                        })}</tr>

                        {/* Realtime Stock Price */}
                        <tr id={styles.whiteRow}><td>Price</td>
                        {tickerPayloadArray.map((x,i) => {
                            return(
                                <td key={`price${i}`}>{props.priceData[i]["regularMarketPrice"] + " " + props.priceData[i]["currency"]}</td>)
                        })}</tr>

                        {/* Market Change Since Close */}
                        <tr id={styles.whiteRow}><td>Change Since Close</td>
                        {tickerPayloadArray.map((x,i) => {
                            const priceChange = props.priceData[i]["regularMarketChange"]
                            function greenOrRed(change) {
                                if (priceChange > 0) {
                                    return styles.positiveChange
                                    
                                } else if (priceChange < 0) {
                                    return styles.negativeChange
                                } else {
                                    return styles.noChange
                                }
                            }

                            return(
                                <td key={`change${i}`} id={greenOrRed(priceChange)}>{priceChange.toFixed(2) + " " + props.priceData[i]["currency"] + "  (" + props.priceData[i]["regularMarketChangePercent"].toFixed(2) + " %)"}</td>
                                )
                        })}</tr>


                        {/* Fifty Day MA */}
                        <tr id={styles.whiteRow}><td>50 Day MA</td>
                        {tickerPayloadArray.map((x,i) => {
                            return(
                                <td key={`50dayMA${i}`}>{props.priceData[i]["fiftyDayAverage"].toFixed(2)}</td>)
                        })}</tr>

                        {/* Two hundred Day MA */}
                        <tr id={styles.whiteRow}><td>200 Day MA</td>
                        {tickerPayloadArray.map((x,i) => {
                            return(
                                <td key={`200dayMA${i}`}>{props.priceData[i]["twoHundredDayAverage"].toFixed(2)}</td>)
                        })}</tr>

                        {/* 52 Week High */}
                        <tr id={styles.whiteRow}><td>52 Week High</td>
                        {tickerPayloadArray.map((x,i) => {
                            return(
                                <td key={`52wkHigh${i}`}>{props.priceData[i]["fiftyTwoWeekHigh"].toFixed(2)}</td>)
                        })}</tr>

                        {/* 52 Week Low */}
                        <tr id={styles.whiteRow}><td>52 Week Low</td>
                        {tickerPayloadArray.map((x,i) => {
                            return(
                                <td key={`52wkLow${i}`}>{props.priceData[i]["fiftyTwoWeekLow"].toFixed(2)}</td>)
                        })}</tr>


                        {/* 52 Week High Discount Percentage */}
                        <tr id={styles.whiteRow}><td>52 Week High Discount (%)</td>
                        {tickerPayloadArray.map((x,i) => {
                            return(
                                <td key={`pctChange${i}`}>{(props.priceData[i]["fiftyTwoWeekHighChangePercent"]*100).toFixed(2) + " %"}</td>)
                        })}</tr>


                        {/* Earnings --------------------------------------------------------------------------------------------------------------------------------*/}
                        <tr id={styles.headerRow}><td>Earnings</td>
                        {tickerPayloadArray.map((x,i) => {
                            return(
                                <td key={`EIG${i}`}></td>)
                        })}</tr>

                        {/* Earnings Per Share */}
                        <tr id={styles.whiteRow}><td>
                            <div className={styles.analysisType}>
                                <OverlayStockTable
                                overlayHeader="Earnings Per Share (EPS)"
                                overlayBody=
                                "EPS indicates how much money a company makes for each share of its stock. A higher EPS indicates greater value."/>
                                Earnings Per Share (EPS) <BsArrowUp/>
                            </div></td>
                        {tickerPayloadArray.map((x,i) => {
                            return(
                                <td key={`EPS${i}`}>{props.priceData[i]["epsTrailingTwelveMonths"]}</td>)
                        })}</tr>


                        {/* Earnings Per Share Forecast */}
                        <tr id={styles.whiteRow}><td>
                            <div className={styles.analysisType}>
                                <OverlayStockTable
                                overlayHeader="Earnings Per Share Forecast"
                                overlayBody="Forecast of the EPS metric above for the coming year."/>
                                Earnings Per Share Forecast <BsArrowUp/>
                            </div></td>
                        {tickerPayloadArray.map((x,i) => {
                            return(
                                <td key={`EPSforecast${i}`}>{props.priceData[i]["epsForward"]}</td>)
                        })}</tr>


                        {/* Earnings Yield (per share) */}
                        <tr id={styles.whiteRow}><td>
                            <div className={styles.analysisType}>
                                <OverlayStockTable
                                overlayHeader="Earnings Yield (per share)"
                                overlayBody="Earnings yield is one indication of value; a low ratio may indicate an overvalued stock, 
                                or a high value may indicate an undervalued stock."/>
                                Earnings Yield (per share) <BsArrowUp/>
                            </div></td>
                        {tickerPayloadArray.map((x,i) => {
                            return(
                                <td key={`EPS${i}`}>{parseFloat((1/props.priceData[i]["epsTrailingTwelveMonths"])*100).toFixed(2)+" %"}</td>)
                        })}</tr>

                        {/* P/E Ratio */}
                        <tr id={styles.whiteRow}><td>
                            <div className={styles.analysisType}>
                                <OverlayStockTable
                                overlayHeader="P/E Ratio (20 or lower)"
                                overlayBody="The price-to-earnings (P/E) ratio relates a company's share price to its earnings per share.
                                Ideally the PE should be lower than 20 but this can vary between different industries."/>
                                P/E Ratio (20 or lower) <BsArrowDown/>
                            </div></td>
                        {tickerPayloadArray.map((x,i) => {
                            return(
                                <td key={`PE${i}`}>{( props.priceData[i]["regularMarketPrice"] / props.priceData[i]["epsTrailingTwelveMonths"] ).toFixed(2)}</td>)
                        })}</tr>


                        {/* PEG Ratio */}
                        <tr id={styles.whiteRow}><td>
                            <div className={styles.analysisType}>
                                <OverlayStockTable
                                overlayHeader="PEG Ratio"
                                overlayBody="The price-to-earnings-growth (PEG) ratio relates PE to its earnings growth. A fairly valued company and supports a PEG ratio of 1.0, an undervalued stock
                                will be < 1.0, and an overvalued stock will be > 1.0."/>
                                PEG Ratio <BsArrowDown/>
                            </div></td>
                        {tickerPayloadArray.map((x,i) => {
                            return(
                                <td key={`PEG${i}`}>{ props.overviewData[i]["PEGRatio"]}</td>)
                        })}</tr>


                        {/* Book Value per Share*/}
                        <tr id={styles.whiteRow}>
                            <td>
                                <div className={styles.analysisType}>
                                    <OverlayStockTable
                                        overlayHeader="Book Value per Share"
                                        overlayBody="Book value per share (BVPS) is the ratio of equity available to common shareholders / number of outstanding shares.
                                        If a company’s BVPS is > its current stock price, it is considered undervalued."
                                        /> Book Value Per Share (BVPS)
                                </div>
                            </td>
                            {tickerPayloadArray.map((x,i) => {
                                return(
                                    <td key={`pbRatio${i}`}>{ props.priceData[i]["bookValue"] }</td>)
                            })}
                        </tr>

                        {/* Price to Book ratio (<1 ideal) */}
                        <tr id={styles.whiteRow}>
                            <td> 
                                <div className={styles.analysisType}>
                                    <OverlayStockTable
                                        overlayHeader="PB Ratio"
                                        overlayBody="PB ratio is calculated by dividing the company's stock price by its book value per share (BVPS). 
                                        PB ratio varies between industries; however, the lower the PB the better the value."
                                        /> Price to Book ratio <BsArrowDown/>    
                                </div>
                            </td>
                            {tickerPayloadArray.map((x,i) => {
                                return(
                                    <td key={`pbRatio${i}`}>{ (props.priceData[i]["regularMarketPrice"] / props.priceData[i]["bookValue"]).toFixed(2) }</td>)
                            })}
                        </tr>

                        {/* Return on Equity */}
                        <tr id={styles.whiteRow}><td> Return on Equity (ROE) <BsArrowUp/> (14%+) </td>
                        {tickerPayloadArray.map((x,i) => {
                            const netIncome = props.incomeData[i]["annualReports"][0]["netIncome"]
                            const shareholdersEquity = props.balanceData[i]["annualReports"][0]["totalShareholderEquity"]
                            return(
                                <td key={`roe${i}`}> {(( netIncome/shareholdersEquity )*100).toFixed(2) + " %"} </td>)
                        })}</tr>
 

                        {/* Total Shareholder Yield */}
                        <tr id={styles.whiteRow}><td> Total Shareholder Yield <BsArrowUp/> </td>
                        {tickerPayloadArray.map((x,i) => {
                            function shareHolderYield(div, shareRepurchase, debtRepayment, marketCap) {
                                return (((div + shareRepurchase + debtRepayment) / marketCap)*100).toFixed(2) + " %"
                            }
                            function netDebtChangeCalculation(annualReport) {
                                // Net debt = (std + ltd) - cce
                                const netDebtCurrent = (+annualReport[0]["shortTermDebt"] + +annualReport[0]["longTermDebt"]) - annualReport[0]["cashAndCashEquivalentsAtCarryingValue"]
                                const netDebtPrevious = (+annualReport[1]["shortTermDebt"] + +annualReport[1]["longTermDebt"]) - annualReport[1]["cashAndCashEquivalentsAtCarryingValue"]
                                return netDebtPrevious - netDebtCurrent
                            }
                            function dividend(dps, sharesOutstanding) {
                                if (dps <= 0) {return 0} else {return dps * sharesOutstanding}
                            }
                            const dividendTotal = dividend(props.overviewData[i]["DividendPerShare"], props.balanceData[i]["annualReports"][0]["commonStockSharesOutstanding"])
                            console.log(dividendTotal)
                            const netShareRepurchase = props.balanceData[i]["annualReports"][1]["totalShareholderEquity"] - props.balanceData[i]["annualReports"][0]["totalShareholderEquity"]
                            const netDebtRepayment = netDebtChangeCalculation(props.balanceData[i]["annualReports"])
                            const marketCapitalisation = props.balanceData[i]["annualReports"][0]["commonStockSharesOutstanding"] * props.priceData[i]["regularMarketPrice"]
                            return(
                                <td key={`shareholderYield${i}`}> {shareHolderYield(dividendTotal, netShareRepurchase, netDebtRepayment, marketCapitalisation)}</td>)
                        })}</tr>


                        {/* Gross Profit Growth Header -----------------------------------------------------------------------------------------------------*/}
                        <tr id={styles.yoyHeader}>
                            <td>
                                <div className={styles.analysisType}>
                                    <OverlayStockTable
                                        overlayHeader="Gross Profit Growth (Year on Year)"
                                        overlayBody="The growth each year of the Gross Profit which is defined as the profit a 
                                        company makes after deducting the costs associated with making/selling products or providing its services. ."
                                        /> Gross Profit Growth (YoY) <BsArrowUp/>  
                                </div> 
                            </td>
                            {tickerPayloadArray.map((x,i) => {
                                return(
                                    <td key={`grossProfit${i}`}></td>)
                            })}
                        </tr>
                                                            
                        <tr id={styles.yoyRow}><td id={styles.year}> {new Date().getFullYear() - 1} </td>
                        {tickerPayloadArray.map((x,i) => {
                            return(
                                <td key={`yr1-${i}`}> { grossProfitProps[i][0] } </td>)})}</tr>

                        <tr id={styles.yoyRow}><td id={styles.year}> {new Date().getFullYear() - 2} </td>
                        {tickerPayloadArray.map((x,i) => {
                            return(
                                <td key={`yr2-${i}`}> { grossProfitProps[i][1] } </td>)})}</tr>
                        
                        <tr id={styles.yoyRow}><td id={styles.year}> {new Date().getFullYear() - 3} </td>
                        {tickerPayloadArray.map((x,i) => {
                            return(
                                <td key={`yr3-${i}`}> { grossProfitProps[i][2] } </td>)})}</tr>

                        <tr id={styles.yoyRow}><td id={styles.year}> {new Date().getFullYear() - 4} </td>
                        {tickerPayloadArray.map((x,i) => {
                            return(
                                <td key={`yr4-${i}`}> { grossProfitProps[i][3] } </td>)})}</tr>

                        <tr id={styles.yoyRow}><td id={styles.year}> {new Date().getFullYear() - 5} </td>
                        {tickerPayloadArray.map((x,i) => {
                            return(
                                <td key={`yr5-${i}`}> { grossProfitProps[i][4] } </td>)})}</tr>


                        {/* Net Profit Growth Header ----------------------------------------------------------------------------------------*/}
                        <tr id={styles.yoyHeader}>
                            <td>
                                <div className={styles.analysisType}>
                                    <OverlayStockTable
                                        overlayHeader="Net Profit Growth (Year on Year)"
                                        overlayBody="The growth each year of the company's Net Profit which is defined as the profit a 
                                        company makes after deducting all costs (cost of goods sold, selling, general and administrative expenses, operating expenses, depreciation, interest, taxes)."
                                        /> Net Profit Growth (YoY) <BsArrowUp/>  
                                </div>
                            </td>
                            {tickerPayloadArray.map((x,i) => {
                                return(
                                    <td key={`netProfit${i}`}></td>)
                            })}
                        </tr>

                        <tr id={styles.yoyRow}><td id={styles.year}> {new Date().getFullYear() - 1} </td>
                        {tickerPayloadArray.map((x,i) => {
                            return(
                                <td key={`yr1-${i}`}> { netProfitProps[i][0] } </td>)})}</tr>
                        
                        <tr id={styles.yoyRow}><td id={styles.year}> {new Date().getFullYear() - 2} </td>
                        {tickerPayloadArray.map((x,i) => {
                            return(
                                <td key={`yr2-${i}`}> { netProfitProps[i][1] } </td>)})}</tr>
                        
                        <tr id={styles.yoyRow}><td id={styles.year}> {new Date().getFullYear() - 3} </td>
                        {tickerPayloadArray.map((x,i) => {
                            return(
                                <td key={`yr3-${i}`}> { netProfitProps[i][2] } </td>)})}</tr>

                        <tr id={styles.yoyRow}><td id={styles.year}> {new Date().getFullYear() - 4} </td>
                        {tickerPayloadArray.map((x,i) => {
                            return(
                                <td key={`yr4-${i}`}> { netProfitProps[i][3] } </td>)})}</tr>
                        
                        <tr id={styles.yoyRow}><td id={styles.year}> {new Date().getFullYear() - 5} </td>
                        {tickerPayloadArray.map((x,i) => {
                            return(
                                <td key={`yr5-${i}`}> { netProfitProps[i][4] } </td>)})}</tr>        


                        {/* Net Profit Margin Header ---------------------------------------------------------------------------------------------*/}
                        <tr id={styles.yoyHeader}>
                            <td>
                                
                                <div className={styles.analysisType}>
                                    <OverlayStockTable
                                        overlayHeader="Net Profit Margin Growth (Year on Year)"
                                        overlayBody="The growth each year of the Net Profit Margin which is defined as the percentage of profit kept by the company per dollar of revenue."
                                        /> Net Profit Margin (YoY) <BsArrowUp/>  
                                </div> 
                            
                            </td>
                        {tickerPayloadArray.map((x,i) => {
                            return(
                                <td key={`netProfitMargin${i}`}></td>)
                        })}</tr>

                        <tr id={styles.yoyRow}><td id={styles.year}> {new Date().getFullYear() - 1} </td>
                        {tickerPayloadArray.map((x,i) => {
                            return(
                                <td key={`yr1-${i}`}> {profitMarginProps[i][0]} </td>)})}</tr>

                        <tr id={styles.yoyRow}><td id={styles.year}> {new Date().getFullYear() - 2} </td>
                        {tickerPayloadArray.map((x,i) => {
                            return(
                                <td key={`yr2-${i}`}> {profitMarginProps[i][1]} </td>)})}</tr>
                        
                        <tr id={styles.yoyRow}><td id={styles.year}> {new Date().getFullYear() - 3} </td>
                        {tickerPayloadArray.map((x,i) => {
                            return(
                                <td key={`yr3-${i}`}> { profitMarginProps[i][2]} </td>)})}</tr>
                        
                        <tr id={styles.yoyRow}><td id={styles.year}> {new Date().getFullYear() - 4} </td>
                        {tickerPayloadArray.map((x,i) => {
                            return(
                                <td key={`yr4-${i}`}> { profitMarginProps[i][3]} </td>)})}</tr>
                        
                        <tr id={styles.yoyRow}><td id={styles.year}> {new Date().getFullYear() - 5} </td>
                        {tickerPayloadArray.map((x,i) => {
                            return(
                                <td key={`yr5-${i}`}> { profitMarginProps[i][4]} </td>)})}</tr>


                 



                        {/* Dividends Header (black) ------------------------------------------------------------------------------------------------------------------- */}
                        <tr id={styles.headerRow}><td>Dividend Information</td>
                        {tickerPayloadArray.map((x,i) => {
                            return(
                                <td key={`dividends${i}`}></td>)
                        })}</tr>

                        {/* Dividend per share */}
                        <tr id={styles.whiteRow}><td> Dividend Per Share</td>
                        {tickerPayloadArray.map((x,i) => {
                            return(
                                <td key={`divPerShare${i}`}> {(props.overviewData[i]["DividendPerShare"]*1).toFixed(2)}</td>)
                        })}</tr>

                        {/* Dividend Yield */}
                        <tr id={styles.whiteRow}><td> Dividend Yield</td>
                        {tickerPayloadArray.map((x,i) => {
                            return(
                                <td key={`divYield${i}`}> {(props.overviewData[i]["DividendYield"]*100).toFixed(2) + " %"}</td>)
                        })}</tr>                    

                        {/* Financials Header (black) ------------------------------------------------------------------------------------------------------------------ */}
                        <tr id={styles.headerRow}><td>Financials</td>
                        {tickerPayloadArray.map((x,i) => {
                            return(
                                <td key={`financials${i}`}></td>)
                        })}</tr>

                        {/* Total Revenue */}
                        <tr id={styles.whiteRow}><td> Total Revenue (TTM) </td>
                        {tickerPayloadArray.map((x,i) => {
                            return(
                                <td key={`totalRevenue${i}`}> {((props.incomeData[i]["annualReports"][0]["totalRevenue"]/10000000|0).toLocaleString())} </td>)
                        })}</tr>   

                        {/* Cost of Goods */}
                        <tr id={styles.whiteRow}><td> Cost of Goods (TTM) </td>
                        {tickerPayloadArray.map((x,i) => {
                            return(
                                <td key={`costOfGoods${i}`}> {((props.incomeData[i]["annualReports"][0]["costofGoodsAndServicesSold"]/10000000|0).toLocaleString())} </td>)
                        })}</tr>


                        {/* Operating Income/Loss (TTM) */}
                        <tr id={styles.whiteRow}><td> Operating Income/Loss (TTM) </td>
                        {tickerPayloadArray.map((x,i) => {
                            return(
                                <td key={`opIncomeAndLoss${i}`}> {((props.incomeData[i]["annualReports"][0]["operatingIncome"]/10000000|0).toLocaleString())} </td>)
                        })}</tr>  

                        {/* Gross Profit (TTM) */}
                        <tr id={styles.whiteRow}><td> Gross Profit (TTM) </td>
                        {tickerPayloadArray.map((x,i) => {
                            return(
                                <td key={`grossProfit${i}`}> {((props.incomeData[i]["annualReports"][0]["grossProfit"]/10000000|0).toLocaleString())} </td>)
                        })}</tr> 

                        {/* Cost of Goods Margin (TTM) */}
                        <tr id={styles.whiteRow}><td> Cost of Goods Margin (TTM) <BsArrowDown/> </td>
                        {tickerPayloadArray.map((x,i) => {
                            return(
                                <td key={`grossProfit${i}`}> {(((props.incomeData[i]["annualReports"][0]["costofGoodsAndServicesSold"]/props.incomeData[i]["annualReports"][0]["totalRevenue"])*100).toFixed(2)) + " %"} </td>)
                        })}</tr>       


                        {/* Operating Margin (TTM) */}
                        <tr id={styles.whiteRow}><td> Operating Margin (TTM) <BsArrowUp/> </td>
                        {tickerPayloadArray.map((x,i) => {
                            return(
                                <td key={`grossProfit${i}`}> {(((props.incomeData[i]["annualReports"][0]["operatingIncome"]/props.incomeData[i]["annualReports"][0]["totalRevenue"])*100).toFixed(2)) + " %"} </td>)
                        })}</tr>

                        {/* Balance Sheet Header (black) ---------------------------------------------------------------------------------------------------------------------- */}
                        <tr id={styles.headerRow}><td>Balance Sheet</td>
                        {tickerPayloadArray.map((x,i) => {
                            return(
                                <td key={`balance${i}`}></td>)
                        })}</tr>

                        {/* Total Cash and ST investments */}
                        <tr id={styles.whiteRow}><td>Total Cash and Short Term Investments</td>
                        {tickerPayloadArray.map((x,i) => {
                            return(
                                <td key={`cashAndInvestments${i}`}>{((props.balanceData[i]["annualReports"][0]["cashAndShortTermInvestments"]/10000000|0).toLocaleString())}</td>)
                        })}</tr>

                        {/* Total Current Assets */}
                        <tr id={styles.whiteRow}><td>Total Current Assets</td>
                        {tickerPayloadArray.map((x,i) => {
                            return(
                                <td key={`currentAssets${i}`}>{((props.balanceData[i]["annualReports"][0]["totalCurrentAssets"]/10000000|0).toLocaleString())}</td>)
                        })}</tr>

                        {/* Total Current Liabilities */}
                        <tr id={styles.whiteRow}><td>Total Current Liabilities</td>
                        {tickerPayloadArray.map((x,i) => {
                            return(
                                <td key={`currentLiabilities${i}`}>{((props.balanceData[i]["annualReports"][0]["totalCurrentLiabilities"]/10000000|0).toLocaleString())}</td>)
                        })}</tr>

                        {/* Total 1 year Excess */}
                        <tr id={styles.whiteRow}><td>1 Year Current Excess <BsArrowUp/> </td>
                        {tickerPayloadArray.map((x,i) => {
                            return(
                                <td key={`oneYearExcess${i}`}>{(((props.balanceData[i]["annualReports"][0]["totalCurrentAssets"] - props.balanceData[i]["annualReports"][0]["totalCurrentLiabilities"])/10000000|0).toLocaleString())}</td>)
                        })}</tr>

                        {/* Asset to Liability Ratio */}
                        <tr id={styles.whiteRow}><td>Current Asset to Liability Ratio <BsArrowUp/> </td>
                        {tickerPayloadArray.map((x,i) => {
                            return(
                                <td key={`assetToLiabilityRatio${i}`}>{((props.balanceData[i]["annualReports"][0]["totalCurrentAssets"]/props.balanceData[i]["annualReports"][0]["totalCurrentLiabilities"]).toFixed(2))}</td>)
                        })}</tr>

                        {/* Total Assets */}
                        <tr id={styles.whiteRow}><td>Total Assets</td>
                        {tickerPayloadArray.map((x,i) => {
                            return(
                                <td key={`totalAssets${i}`}>{((props.balanceData[i]["annualReports"][0]["totalAssets"]/10000000|0).toLocaleString())}</td>)
                        })}</tr>

                        {/* Total Liabilities */}
                        <tr id={styles.whiteRow}><td>Total Liabilities</td>
                        {tickerPayloadArray.map((x,i) => {
                            return(
                                <td key={`totalLiabilities${i}`}>{((props.balanceData[i]["annualReports"][0]["totalLiabilities"]/10000000|0).toLocaleString())}</td>)
                        })}</tr>

                        {/* TATL Ratio */}
                        <tr id={styles.whiteRow}><td>Total Asset to Liability Ratio (TATL) <BsArrowUp/> </td>
                        {tickerPayloadArray.map((x,i) => {
                            return(
                                <td key={`assetToLiabilityRatio${i}`}>{((props.balanceData[i]["annualReports"][0]["totalAssets"]/props.balanceData[i]["annualReports"][0]["totalLiabilities"]).toFixed(2))}</td>)
                        })}</tr>

                        {/* Total Shareholder Equity */}
                        <tr id={styles.whiteRow}><td>Total Shareholder Equity</td>
                        {tickerPayloadArray.map((x,i) => {
                            return(
                                <td key={`totalShareholderEquity${i}`}>{((props.balanceData[i]["annualReports"][0]["totalShareholderEquity"]/10000000|0).toLocaleString())}</td>)
                        })}</tr>

                        {/* Debt to Equity Ratio */}
                        <tr id={styles.whiteRow}><td>Debt to Equity Ratio <BsArrowDown/> </td>
                        {tickerPayloadArray.map((x,i) => {
                            return(
                                <td key={`debtToEquity${i}`}>{((props.balanceData[i]["annualReports"][0]["totalLiabilities"]/props.balanceData[i]["annualReports"][0]["totalShareholderEquity"]).toFixed(2))}</td>)
                        })}</tr>

                        {/* Altman Z-Score */}
                        <tr id={styles.whiteRow}><td>Altman Z-Score <BsArrowUp/> </td>
                        {tickerPayloadArray.map((x,i) => {
                            const totalAssets = props.balanceData[i]["annualReports"][0]["totalAssets"]
                            const totalLiabilities = props.balanceData[i]["annualReports"][0]["totalLiabilities"]
                            const workingCapital = props.balanceData[i]["annualReports"][0]["totalCurrentAssets"] - props.balanceData[i]["annualReports"][0]["totalCurrentLiabilities"]
                            const a = workingCapital / totalAssets
                            const b = props.balanceData[i]["annualReports"][0]["retainedEarnings"] / totalAssets
                            const c = props.incomeData[i]["annualReports"][0]["ebit"] / props.balanceData[i]["annualReports"][0]["totalAssets"]
                            const marketCapitalisation = props.balanceData[i]["annualReports"][0]["commonStockSharesOutstanding"] * props.priceData[i]["regularMarketPrice"]
                            const d = marketCapitalisation / totalLiabilities
                            const e = props.incomeData[i]["annualReports"][0]["totalRevenue"] / totalAssets
                            const altmanZScore = (1.2*a) + (1.4*b) + (3.3*c) + (0.6*d) + (1.0*e)
                            return(
                                <td key={`debtToEquity${i}`}>{altmanZScore.toFixed(2)}</td>)
                        })}</tr>

                    </tbody>
                </table>
            </div>
        </div>
  )
}


export async function getServerSideProps(props, context) {

    function sleep(milliseconds) {
        const date = Date.now();
        let currentDate = null;
        do {
          currentDate = Date.now();
        } while (currentDate - date < milliseconds);
    }


    function growthCalculation(annualReport, type) {
        const growths = []
        for (let i=0; i<annualReport.length-1; i++ ){
            const current = annualReport[i][type]
            const previous = annualReport[i+1][type]
            const yearGrowth = (((current - previous) / previous ) * 100).toFixed(2) + " %"
            growths.push(yearGrowth)
        }
        return growths
    }


    function ratioCalculation(annualReport, var1, var2) {
        const allRatios = []
        for (let i=0; i<annualReport.length; i++) {
            const numerator = annualReport[i][var1]
            const denominator = annualReport[i][var2]
            const ratio = ((numerator/denominator)*100).toFixed(2) + " %"
            allRatios.push(ratio)
        }
        return allRatios
    }

    function standardiseData(annualReports){
        if (annualReports.length === 5) {
            console.log("No action")
        } else if (annualReports.length < 5) {
            const difference = (5 - annualReports.length)
            for (var i=0; i<difference; i++) annualReports.push("No Data")
        } else {
            const extra = (annualReports.length - 5)
            for (var i=0; i<extra; i++) annualReports.pop()
        }
        return annualReports
    }


    const queryTickers = props.query
    const overviewData = [];
    const incomeData = [];
    const priceData = [];
    const balanceData = [];
    const grossProfitAll = [];
    const netProfitAll = [];
    const netProfitMarginAll = [];
    const logoImages = [];


    for (const singleTicker in queryTickers) {
        const ticker = queryTickers[singleTicker]

        // ----- Overview Data - Alpha Vantage API -----:
        console.log(`Overview query running ${ticker}... `);
        const overviewResponse = await fetch(`https://www.alphavantage.co/query?function=OVERVIEW&symbol=${ticker}&apikey=Z7EE76KI01SJKDIN`);
        const overview = await overviewResponse.json();
        overviewData.push(overview);
        console.log(overview)
        await sleep(12000);  
        

        // ----- Income Data - Alpha Vantage API -----:
        console.log(`Income query running ${ticker}... `);
        const incomeResponse = await fetch(`https://www.alphavantage.co/query?function=INCOME_STATEMENT&symbol=${ticker}&apikey=Z7EE76KI01SJKDIN`);
        const income = await incomeResponse.json();
        incomeData.push(income);
        console.log(income)
        await sleep(12000);  

        // ----- Price Data - Yahoo Finance API -----:
        console.log(`Price query running ${ticker}... `);
        const priceResponse = await fetch(`https://yfapi.net/v6/finance/quote?region=US&lang=en&symbols=${ticker}`, {
            method: "GET", 
            accept: "application/json",
            headers: {'x-api-key': 'iRNetd47al209NQNtgJcg4e2vbOM5N8g2oiz5Row'}});
        const prices = await priceResponse.json();
        console.log(prices)
        console.log("hello is it here ")
        const shortenedPrices = prices["quoteResponse"]["result"][0]
        priceData.push(shortenedPrices);


        // ----- Balance Sheet Data - Alpha Vantage API -----:
        console.log(`Balance query running ${ticker}... `);
        const balanceResponse = await fetch(`https://www.alphavantage.co/query?function=BALANCE_SHEET&symbol=${ticker}&apikey=Z7EE76KI01SJKDIN`);
        const balance = await balanceResponse.json();
        balanceData.push(balance);
        await sleep(12000);

        // Gross profit growth:
        console.log(`Gross Profit Growth Calculation running ${ticker}... `);
        const grossProfitGrowth = growthCalculation(income["annualReports"], "grossProfit")
        const normalisedGrossProfit = standardiseData(grossProfitGrowth)
        grossProfitAll.push(normalisedGrossProfit)

        // Net Profit growth:
        console.log(`Net Profit Growth Calculation running ${ticker}... `);
        const netProfitGrowth = growthCalculation(income["annualReports"], "netIncome")
        const normalisedNetProfit = standardiseData(netProfitGrowth)
        netProfitAll.push(normalisedNetProfit)

        // Net Profit Margin
        console.log(`Net Profit Margin Calculation running ${ticker}... `);
        const netProfitMargin = ratioCalculation(income["annualReports"], "netIncome", "totalRevenue")
        const normalisedNetProfitMargin = standardiseData(netProfitMargin)
        netProfitMarginAll.push(normalisedNetProfitMargin)

        //image:
        console.log(`Image Scraper running ${ticker}... `);
        const google = new Scraper({
            puppeteer: {
              headless: true,
            },
        });

        const logoQuery = overview["Name"]
        const logoQueryTest = "a"
        const concat = `${logoQuery} SVG logo`
        console.log(concat)
        const results = await google.scrape(concat, 1);
        const image = results[0]["url"]
        console.log(image);
        logoImages.push(image)




        

    }

    //console.log(overviewData)
    //console.log(incomeData)
    //console.log(priceData)
    //console.log(balanceData)
    //console.log(grossprofitall[0])

    return{
        props: { overviewData, incomeData, priceData, balanceData, grossProfitAll, netProfitAll, netProfitMarginAll, logoImages }
    }

    
    
}




    



    

    
  

export default Index