import { Box, Slider, SliderFilledTrack, SliderMark, SliderThumb, SliderTrack, Tooltip } from "@chakra-ui/react"
import { useState } from "react"

function SliderThumbWithTooltip({ value, min, max, onChange, step }: { value: number, min: number, max: number, onChange: (value: number) => void, step: number }) {
    const [showTooltip, setShowTooltip] = useState(false)

    return (
        <Slider
            className="!pt-[35px]"
            id='slider'
            min={min}
            value={value}
            max={max}
            step={step}
            colorScheme="#3984d5"
            onChange={onChange}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
        >
            <SliderTrack bg={"#28407b"} >
                <SliderFilledTrack bg="#3984d5" />
            </SliderTrack>
            <Tooltip
                hasArrow
                color='white'
                placement='top'
                isOpen={showTooltip}
                label={`${value}%`}
            >
                <SliderThumb />
            </Tooltip>
        </Slider >
    )
}

export default SliderThumbWithTooltip;
