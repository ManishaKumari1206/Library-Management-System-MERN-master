import React from 'react'
import './News.css'

function News() {
    return (
        <div className='news-container'>
            <h className='news-title'>Updates for You</h>
            <div className='news-data'>
                <div className='news-empty'></div>
                <div>
                    <h1 className='news-subtitle'>Competitions</h1>
                    <div>
                        <div className='news-competition-event'>
                            <p>Competion-1</p>
                            <p>Essay Writing Contest on "The Future of Libraries"</p>
                        </div>
                        <div className='news-competition-event'>
                            <p>Competion-2</p>
                            <p>Short Story Challenge: "A Mystery in the Stacks"</p>
                        </div>
                        <div className='news-competition-event'>
                            <p>Competion-3</p>
                            <p>Read-a-thon: Who Can Read the Most Books in a Month?</p>
                        </div>
                        <div className='news-competition-event'>
                            <p>Competion-4</p>
                            <p>Poetry Slam on a Historical Theme</p>
                        </div>
                        <div className='news-competition-event'>
                            <p>Competion-5</p>
                            <p>Fan Fiction Contest for a Popular Book Series</p>
                        </div>
                    </div>
                </div>
                <div className='news-empty'></div>
                <div>
                    <h1 className='news-subtitle'>Online Quiz</h1>
                    <div>
                        <div className='news-quiz-event'>
                            <p>Quiz-1</p>
                            <p>Literary Trivia: Questions about famous authors and books.</p>
                        </div>
                        <div className='news-quiz-event'>
                            <p>Quiz-2</p>
                            <p>World History Quiz: General knowledge questions on historical events.</p>
                        </div>
                        <div className='news-quiz-event'>
                            <p>Quiz-3</p>
                            <p>Science and Technology Quiz: Questions about scientific discoveries and tech.</p>
                        </div>
                        <div className='news-quiz-event'>
                            <p>Quiz-4</p>
                            <p>Pop Culture Quiz: Questions on current movies, music, and trends.</p>
                        </div>
                        <div className='news-quiz-event'>
                            <p>Quiz-5</p>
                            <p>General Knowledge: A mix of questions from various subjects.</p>
                        </div>
                    </div>
                </div>
                <div className='news-empty'></div>
            </div>
        </div>
    )
}

export default News
