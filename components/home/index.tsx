import React, { useState, useEffect } from "react";
import { Box, Button, Center, Container, FlatList, Flex, Heading, HStack, Image, SimpleGrid, Switch, Text, VStack, ZStack } from "native-base";
import { StyleSheet } from "react-native"
import { NativeStackNavigationHelpers } from "@react-navigation/native-stack/lib/typescript/src/types";

interface NetworkItem {
    label: string,
    value: number,
    unit: string
}

interface FunctionItem {
    label: string,
    desc: string,
    route: string,
    img: string,
    enable: boolean
}

const Home = ({ navigation }) => {
    const [networkItemList, setNetworkItemList] = useState<NetworkItem[]>([
        {
            label: "下载量",
            value: 110,
            unit: 'byte'
        },
        {
            label: "上传量",
            value: 2220,
            unit: 'byte'
        },
        {
            label: "请求数",
            value: 3330,
            unit: ''
        }
    ])

    const [functionList, setFunctionList] = useState<FunctionItem[]>([
        {
            label: "过滤器",
            desc: "只抓取指定规则的数据包",
            route: "",
            img: "",
            enable: false
        },
        {
            label: "Host",
            desc: "对指定域名进行映射",
            route: "",
            img: "",
            enable: false
        },
        {
            label: "Https",
            desc: "抓取Https数据包",
            route: "",
            img: "",
            enable: false
        }
    ])
    const [timer, setTimer] = useState<Number>(0)

    useEffect(() => {
        console.log(timer) // 
    })

    const begin = () => {
        navigation.push("Hosts")
        setTimer(Number(setInterval(() => {
            setNetworkItemList((old) => {
                const tmp = [...old]
                tmp.forEach(i => {
                    i.value = Number((Math.random() * 10).toFixed(0))
                })
                return tmp
            })
        }, 1000)))
    }

    return (
        <Container px="2%" py="2%" maxW="100%" h="100%">
            <Flex style={style.card} justifyContent="center" h="12%" shadow="2">
                <Button>begin</Button>
            </Flex>
            <Flex mt="5" style={style.card} direction="column" justifyContent="center" h="20%" shadow="2">
                <Heading color="muted.600" fontSize="md">累计抓包</Heading>
                <Text fontWeight="medium" color="primary.90" fontSize="md">18分29秒</Text>
                <Container w="100%" my="5%" backgroundColor="muted.300" h="1px"></Container>
                <HStack w="75%" justifyContent="space-between">
                    {networkItemList.map(i => <NetworkData key={i.label} item={i}></NetworkData>)}
                </HStack>
            </Flex>
            <FunctionList list={functionList} ></FunctionList>
        </Container>
    )
}
interface NetworkDataProps {
    item: NetworkItem
}

const NetworkData = (props: NetworkDataProps) => {
    return (
        <VStack alignItems="center">
            <Heading color="muted.600" fontSize="sm">{props.item.label}</Heading>
            <Text fontWeight="medium" color="primary.90" fontSize="sm">{props.item.value}</Text>
        </VStack>
    )
}

const FunctionList = (props: any) => {
    return (
        <Container mt="5" maxW="100%" w="100%">
            <Center w="100%" >
                <FlatList w="100%" columnWrapperStyle={style.between} numColumns={2} data={props.list} renderItem={(i) =>
                    <FunctionCard item={i.item}></FunctionCard>}
                >
                </FlatList>
            </Center>
        </Container>
    )
}

const FunctionCard = (props: any) => {
    const { item } = props
    console.log(item)
    return (
        <Flex justifyContent="space-between" py="1.5rem" px="1rem" h="43vw" w="43vw" bg="white" rounded="2xl" shadow={3}>
            <Flex flexDirection="row" justifyContent="space-between" alignItems="center">
                <Image w="10" h="10" source={{
                    uri: "https://wallpaperaccess.com/full/317501.jpg"
                }}></Image>
                <Switch offTrackColor="indigo.100" onTrackColor="indigo.200" onThumbColor="primary.80" offThumbColor="indigo.50" />
            </Flex>
            <Container maxW="100%">
                <Text fontWeight="bold" color="primary.100" fontSize="sm">{item.label}</Text>
                <Text color="primary.60" fontSize="2xs">{item.desc}</Text>
            </Container>
        </Flex>
    )
}

const style = StyleSheet.create({
    between: {
        justifyContent: "space-between",
        marginBottom: "1rem"
    },
    card: {
        borderRadius: 6,
        backgroundColor: "white",
        alignItems: "center",
        maxWidth: "100%",
        width: "100%"
    }
})

export default Home;