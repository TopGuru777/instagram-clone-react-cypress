import React, {useContext} from "react";
import Auxiliary from "../../Components/HOC/Auxiliary";
import "./Suggestions.scss";
import { AppContext } from "../../Context";
import SuggestionItem from "../../Components/SuggestItem/SuggestItem";

const Suggestions = () => {
    const { suggestionsList, uid } = useContext(AppContext);
    return (
        <Auxiliary>
            <div id="suggestionsPage">
                <div className="desktop-comp ">
                    <div className="suggestions--p--inner">
                        <h4>Suggested</h4>
                        <ul className="suggestions--p--ul">
                            {
                                suggestionsList && suggestionsList.length > 0 ?
                                 suggestionsList.filter(user => user.uid !== uid ).map((user,i) => (
                                    <SuggestionItem
                                        key={i}
                                        userName={user?.userName}
                                        isVerified={user?.isVerified}
                                        userUid={user?.uid}
                                        userAvatarUrl={user?.userAvatarUrl}
                                    />
                                    ))
                                    :
                                    <h6>No suggestions yet</h6>
                            }
                           
                        </ul>
                       
                    </div>
                </div>
            </div>
        </Auxiliary>
    )
}

export default Suggestions;