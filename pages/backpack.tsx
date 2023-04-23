//@ts-nocheck
import { useQuery } from "@tanstack/react-query";
import {
  Box,
  Button,
  Flex,
  Input,
  Spinner,
  Tag,
  TagLabel,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { CardFactory } from "@/components/CardFactory/card.factory";
import { toast } from "react-hot-toast";
import { DECK_ID } from "@/lib/constants/unmatched-deckids";
import { useUnmatchedDeck } from "@/lib/hooks/useUnmatchedDeck";

const BackpackPage = () => {
  const [selectedCardIndex, setSelectedCardIndex] = useState<number>(0);
  const { data, isLoading, error, deckId, setDeckId, apiUrl, setApiUrl } =
    useUnmatchedDeck();

  return (
    <Box p={3}>
      <Text p={"1rem 0"}>
        <a href="https://unmatched.cards/decks" target="_blank">
          <Tag>Find</Tag>
        </a>{" "}
        and Load a deck
      </Text>
      <Flex gap={2} flexDir={"column"}>
        <Input
          w="50%"
          placeholder={DECK_ID.THRALL}
          onChange={(e) => setDeckId(e.target.value)}
        />
        <Tag fontFamily={"monospace"} fontSize={"0.75rem"} opacity={"0.5"}>
          {apiUrl + deckId}
        </Tag>
      </Flex>
      {!!deckId && isLoading && <Spinner />}

      {data?.deck_data && (
        <Box w="75%" margin="5rem auto">
          <Flex m={"2rem 0"} gap={2}>
            <Button
              display={
                data.deck_data.cards.length > selectedCardIndex
                  ? "inline"
                  : "none"
              }
              onClick={() => {
                setSelectedCardIndex(selectedCardIndex + 1);
              }}
            >
              +
            </Button>

            <Button
              display={selectedCardIndex > 0 ? "inline" : "none"}
              onClick={() => {
                setSelectedCardIndex(selectedCardIndex - 1);
              }}
            >
              -
            </Button>
          </Flex>
          <Box h={"300px"}>
            <CardFactory card={data.deck_data.cards[selectedCardIndex]} />
          </Box>
          <code>{JSON.stringify(data.deck_data.cards[selectedCardIndex])}</code>
        </Box>
      )}
      {error && <ErrorBox error={error} />}

      <Box pt={3}>
        <Text>
          ...or{" "}
          <a
            href="https://github.com/JollyGrin/unbrewed-api"
            style={{ textDecoration: "underline" }}
          >
            change the url used to fetch the deck
          </a>
        </Text>
        <Input
          w="50%"
          defaultValue={apiUrl}
          onChange={(e) => setApiUrl(e.target.value)}
        />
      </Box>
    </Box>
  );
};
export default BackpackPage;

const ErrorBox = ({ error }) => {
  return (
    <Box minH={"200px"} p={3} borderRadius={5} bg="gray">
      <Text color="tomato">{JSON.stringify(error)}</Text>
    </Box>
  );
};
