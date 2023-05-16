import Head from "next/head";
import { Box, Button, Flex, Link, styled, Typography } from "@aura-ui/react";
import { ConnectWallet, useConnect } from "arweave-wallet-ui-test";
import { account, getAccount } from "@/lib/arweave";
import { getBookmarks } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { ArrowRightIcon, BookmarkFilledIcon } from "@radix-ui/react-icons";
import { useMotionAnimate } from "motion-hooks";
import { stagger } from "motion";
import { useEffect } from "react";
import { Loader } from "@/ui/Loader";
import { CreateDialog } from "@/modules/CreateDialog/CreateDialog";
import {
  createMachine,
  invoke,
  Machine,
  reduce,
  state,
  transition,
} from "robot3";
import { useMachine } from "react-robot";

// const machine: Machine = createMachine({
//   idle: state(transition("fetch", "fetching")),
//   fetching: invoke(getBookmarks,
//     transition('success', 'fetched',
//       reduce((ctx, ev) => ({ ...ctx, bookmarks: ev.data }))
//     ),

//   ),
//   success: state(),
//   failed: state(transition("retry", "fetching")),
// });

const Main = styled("main", {
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  justifyContent: "center",
  gap: "$10",
});

export default function Home() {
  const { walletAddress } = useConnect();
  // const [current, send] = useMachine(machine);
  const { play } = useMotionAnimate(
    ".bookmark",
    { opacity: 1 },
    {
      delay: stagger(0.075),
      duration: 0.5,
      easing: "ease-in-out",
    }
  );
  const { data, isLoading, isSuccess, isError, status } = useQuery({
    queryKey: ["bookmarks"],
    queryFn: () => getBookmarks(walletAddress),
    enabled: !!walletAddress,
    // refetchInterval: 3000,
  });

  // Play the animation on mount of the component
  useEffect(() => {
    if (walletAddress && data && data.length > 0) {
      play();
    }
  }, [data, walletAddress]);

  useEffect(() => {
    if (walletAddress) {
      getAcc();
    }
  }, [walletAddress]);

  const getAcc = async () => {
    if (!walletAddress) return;

    const account = await getAccount(walletAddress);
    console.log(account);
  };

  return (
    <>
      <Head>
        <title>libra</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="favicon.ico" />
      </Head>
      <Flex
        css={{
          p: "$10",
        }}
        justify="between"
      >
        <Flex align="center" gap="5">
          <Typography size="8" weight="6">
            libra
          </Typography>
        </Flex>
        <ConnectWallet
          connectButtonVariant="ghost"
          connectButtonColorScheme="indigo"
          arweaveAccount={account}
          appName="Libra"
          permissions={[
            "ACCESS_ADDRESS",
            "ACCESS_ALL_ADDRESSES",
            "DISPATCH",
            "SIGN_TRANSACTION",
            "ACCESS_ARWEAVE_CONFIG",
          ]}
        />
      </Flex>
      <Main>
        <Flex gap="5">
          <Typography
            size="2"
            css={{
              py: "$2",
              px: "$3",
              backgroundColor: "$indigo3",
              display: "flex",
              alignItems: "center",
              gap: "$2",
              br: "$3",
            }}
          >
            <Flex
              as="span"
              align="center"
              justify="center"
              css={{
                "& svg": {
                  fill: "$indigo11",
                },
              }}
            >
              <BookmarkFilledIcon />
            </Flex>
            All Bookmarks
          </Typography>
          {data && data.length > 0 && walletAddress && (
            <CreateDialog>
              <Button colorScheme="indigo" variant="solid">
                Bookmark a Transaction
              </Button>
            </CreateDialog>
          )}
        </Flex>
        {walletAddress ? (
          <>
            {!isLoading && data?.length === 0 && (
              <Flex
                css={{
                  br: "$5",
                  py: "$7",
                  px: "$16",
                  border: "2px dashed $colors$indigo7",
                }}
                align="center"
                direction="column"
                gap="5"
              >
                <Box
                  css={{
                    "& svg": {
                      fill: "$indigo11",
                      size: 80,
                    },
                  }}
                >
                  <BookmarkFilledIcon />
                </Box>
                <Typography size="6" weight="6" colorScheme="indigo">
                  Save your first bookmark
                </Typography>
                <CreateDialog>
                  <Button colorScheme="indigo" variant="solid">
                    Bookmark a Transaction
                  </Button>
                </CreateDialog>
              </Flex>
            )}
            {isLoading && <Loader />}
            {data && data.length > 0 && (
              <Flex direction="column" gap="5">
                {data?.map((data) => (
                  <Link
                    className="bookmark"
                    css={{
                      fontSize: "$5",
                      lineHeight: "$5",
                      color: "inherit",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "$2",
                      backgroundColor: "$indigo2",
                      opacity: 0,

                      "& span": {
                        transition: "transform 300ms ease-in",
                      },

                      "&:hover": {
                        backgroundColor: "$indigo3",
                        color: "$indigo11",

                        "& span": {
                          transform: "translateX(4px)",
                          transition: "transform 300ms ease-in",
                        },
                      },
                    }}
                    variant="noUnderline"
                    href={`https://arweave.net/${data.targetId}`}
                    key={data.id}
                  >
                    <Box css={{ display: "flex" }} as="span">
                      <ArrowRightIcon width={28} height={28} />
                    </Box>
                    {data.name}
                  </Link>
                ))}
              </Flex>
            )}
          </>
        ) : (
          <Typography>
            Connect your wallet to start view or create bookmarks
          </Typography>
        )}
        {/* <Typography>{current.name}</Typography> */}
      </Main>
    </>
  );
}
