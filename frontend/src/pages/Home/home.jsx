import React from 'react'
import 'antd/dist/antd';
import TrendingList from '../../Components/TrendingList/TrendingList';
import SuggestionItems from '../../Components/SuggestionItems/SuggestionItems';
import RecommendedList from '../../Components/RecommendedList/RecommendedList';
import HandPickedItems from '../../Components/HandPickedItems/HandPickedItems';
import HandPickedList from '../../Components/HandPickedList/HandPickedList';
import SubscribePage from '../../Components/SubscribePage/SubscribePage';
import Header from '../../Components/Header/header';
import Footer from '../../Components/Footer/footer'
import SuggestionListTab from '../../Components/SuggestionListTab/SuggestionListTab';

function Home() {
    return (
    <>
    <div className='sticky-header'>
    <Header/>
    </div>
    <TrendingList/>
    <SuggestionItems/>
    <RecommendedList/>
    <HandPickedList/>
    <SuggestionListTab/>
    <HandPickedItems/>
    <SubscribePage/>
    <Footer/>
    </>
    )
}

export default Home