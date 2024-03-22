import React, {useState, useEffect, useRef, useContext} from 'react';
import {storage} from "../services/storage";
import {Center, HStack, SliderFilledTrack, TooltipContent, Slider, SliderThumb, SliderTrack, Tooltip} from "@gluestack-ui/themed";

import {Text} from "react-native";

const SettingsAdrenaline = (params) => {
    let type = params.params;
    const [adrenalineTimer, setAdrenalineTimer] = useState(null);
    useEffect(() => {
        const fetchMetronome = async () => {
            let temp = await storage.getValue((type === 1 ? 'adult_adre_time' : 'pediatric_adre_time'));
            setAdrenalineTimer(temp)
        };
        fetchMetronome();
    }, [type]);
    const [sliderValue, setSliderValue] = React.useState(adrenalineTimer);
    const handleChange = (value, type) => {
        setSliderValue(value);
    }
    return (
        <HStack style={styles.adrenaline} space="lg">
            <Text size="md">0</Text>
            <Tooltip
                placement={"top"}
                trigger={(triggerProps) => {
                    return (
                        <Center w="$80">
                            <Slider
                                step={1}
                                sliderTrackHeight={1}
                                value={sliderValue}
                                maxValue={10}
                                minValue={0}
                                onChange={(v) => {
                                    handleChange(Math.floor(v))
                                }}
                            >
                                <SliderTrack>
                                    <SliderFilledTrack />
                                </SliderTrack>
                                <SliderThumb {...triggerProps} />
                            </Slider>
                        </Center>
                    )
                }}
            >
                <TooltipContent>
                    <Text color="white">{"SS" + sliderValue}</Text>
                </TooltipContent>
            </Tooltip>
            <Text size="md">10</Text>
        </HStack>

    )
}

const styles = {
    adrenaline: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 50,
    },
}
export default SettingsAdrenaline;
