# prestige_deck_building_game
An original deck building game  

## Project Summary
The goal of this project is to create an original deck-building game called "Prestige"
The game concept was created by me (Max Feldhamer) and my Friend Doniel Borderick.
The development of the game will be done by me.
The art will (probably) be done by my wife, Danielle Feldhamer.

## Basic Game Summary
The ideas for the game are not totally fleshed out, and as such everythin in this description is subject to change, but as the basic idea the game will consist of deck-building phases and card playing phases. The deck-buiding will be in a "draft" method. Different cards will have different levels which players can only access based on their "prestige". The players will also choose a class to play as which will affect abilities they can use. Prestige levels can go up by aquiring certain cards or completing "quests". There will be global quests which all players can race to complete (possibly allowing multiple completions/for multiple players to complete).

### Win Conditions
The game will either end after "defeating" the opponents (reducing their health or some other "currency") or by acheiving some maximum level yourself (will be decide on more clearly later)

## Technical Implementation Plan
1. Build Project Infrastructure (Vite + React + TS) 
2. Define card schema in JSON
3. Build basic web UI to show cards in hand/decks etc. 
4. Step-by-step Implementation of Game Procedures (Draw Hand, End Turn, etc.)
5. Implement game connection for multiplayer play using websockets
6. Render Graphics
7. Polish and Repeat

## Summary
This project and readme will evolve with time, hopefully into a succesfull and fun game.

## Development Documentation
### Day One
#### Started with setting up the basic infrastructure:
1. React TS Front End served with Vite
2. node TS Back End

#### Serve files from server
For step Below

#### Created Basic Cards
1. Created cards.json file which contains different cards, their titles and images
2. Created card component which defines a card and card fetcher component which (currently) gets a random card. This is done by randomly choosing an index i and returning the values in cards.json of the i-th key (card) such as its title and image.

### Day Two
#### Updated Card Design
1. Have optional overlays on corners of cards for cost and prestige.
2. Cards have title (required), image (required), ability, description, cost and prestige

#### Updated Card API
Added optional query param to choose card instead of fetching random card.

#### Started Implementation of CardHand Component to Store and Visualize a Hand of Cards
Take an array of string as props with each string being a card type. Maps them to CardFetcher components. 

