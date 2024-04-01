import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@chakra-ui/react';

export const CustomTooltip = styled(({ className, ...props }: any) => (
    <Tooltip {...props} classes={{ popper: className }} arrow placement='top' />
))({
    [`& .${tooltipClasses.tooltip}`]: {
        maxWidth: '200px',
        borderRadius: 10,
        color: '#FFFFFF',
        backgroundColor: '#292D32',
        boxShadow: '0px 3px 8px rgba(0, 0, 0, 0.25)',
        textAlign: 'center'
    },
});
