import { AnimatePresence, motion } from "framer-motion";
import { Box, Button } from "@chakra-ui/react";
import { useState } from "react";

const cards = [
  { id: 1, title: "Card 1", content: "Content for Card 1" },
  { id: 2, title: "Card 2", content: "Content for Card 2" },
  { id: 3, title: "Card 3", content: "Content for Card 3" },
];

const Card = ({ id, title, content }) => {
  return (
    <Box
      key={id}
      bgColor="white"
      borderWidth="1px"
      borderRadius="lg"
      p={4}
      shadow="md"
      w="300px"
      h="200px"
    >
      <h1>{title}</h1>
      <p>{content}</p>
    </Box>
  );
};

export const CardCarousel = () => {
  const [currentCard, setCurrentCard] = useState(cards[0]);

  const goToNextCard = () => {
    const nextCardIndex =
      cards.findIndex((card) => card.id === currentCard.id) + 1;
    setCurrentCard(cards[nextCardIndex] || cards[0]);
  };

  const goToPrevCard = () => {
    const prevCardIndex =
      cards.findIndex((card) => card.id === currentCard.id) - 1;
    setCurrentCard(cards[prevCardIndex] || cards[cards.length - 1]);
  };

  return (
    <>
      <Box pt='20'>
        <Button onClick={goToPrevCard}>Previous Card</Button>
        <Button onClick={goToNextCard}>Next Card</Button>
          <motion.div
            key={currentCard.id}
            initial={{ opacity: 0, x: "-100%" }}
            animate={{ opacity: 1, x: "0%" }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.5 }}
          >
            <Card
              id={currentCard.id}
              title={currentCard.title}
              content={currentCard.content}
            />
          </motion.div>
      </Box>
    </>
  );
};
