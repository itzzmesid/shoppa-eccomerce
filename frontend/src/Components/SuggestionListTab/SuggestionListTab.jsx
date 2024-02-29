import React, { useState,useEffect } from 'react'
import { Tabs } from 'antd';
import suggestedData from '../../suggestedData.json'
import SuggestionList from '../SuggestionList/SuggestionList';
import './SuggestionListTab.css'
import { getCategoryData } from '../../Utils/axios/axiosRoutes';

function SuggestionListTab() {
    const [suggestionList, setSuggestionList] = useState([]);
    useEffect(() => {getCategoryData() //get request for accessing categories and products
    .then(response => {
      setSuggestionList(response)
    }
    ) ; }, []);
    console.log('list',suggestionList)
    const[suggestedId,setSuggestedId]= useState()
    const changeId=()=>{
        // setSuggestedId(itemId)
        console.log('clicked');
    }
    
    return (
        <div className='container'>
            
            <div className='suggestion-tab-buttons' >
                <Tabs defaultActiveKey={suggestionList?.categories?._id}>
                 {suggestionList?.categories?.slice(0,6).map((suggestionsItem) => {
                    return (
                        <> 
                <Tabs.TabPane  tab={suggestionsItem.name} key={suggestionsItem._id}>
             <div>
                <SuggestionList suggestedItemsId={suggestionsItem._id} />
            </div>
                </Tabs.TabPane>
                    </>
           
                    )
                })}
                  </Tabs>
            </div>
        </div>
    )
}

export default SuggestionListTab