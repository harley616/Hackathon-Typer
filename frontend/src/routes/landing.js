import React from 'react';
import '../styles/startStyle.css';

export default function Landing(){
    return (
        <div class="index">
            <div class="container">
                <div class="decoration">
                    {/* <!-- Philodendron leaves --> */}
                    <img src="leaf1.png" class="leaf leaf1" alt="Leaf 1"/>
                    <img src="leaf1.png" class="leaf leaf2" alt="Leaf 2"/>
                    {/* <!-- End of Philodendron leaves --> */}
                </div>
                
                <header>
                    <div class="big_button">
                        <a href="leaderboard.html">
                            <button>Start Game</button>
                        </a>
                    </div>
                </header>
            </div>
        </div>
    );
}