import { Box, Text } from '@chakra-ui/react';

export default function PaintingProgress({ height }: { height: any }) {
  const isDarkMode = true

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: isDarkMode ? '#1D1E23' : '#FFFFFF',
        padding: { xs: '10px', md: '20px' },
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '10px',
        height: { xs: '100%', md: '400px' },
      }}
    >
      <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'} rowGap={'10px'}>
        <Box>
          {/* <Image
            src={Gif}
            alt="gegoi"
            style={{ width: '100px', height: '100px' }}
          /> */}
        </Box>
        <Box>
          <Text
            fontSize={{ xs: '12px', sm: '16', md: '20px' }}
            fontWeight={'700'}
            color={isDarkMode ? '#FFFFFF' : '#000000'}
            textAlign={'center'}
          >
            Painting in progress
          </Text>
          <Text
            display={{ xs: 'none', md: 'flex' }}
            fontSize={{ xs: '10px', md: '12px' }}
            fontWeight={'400'}
            color={isDarkMode ? '#787878' : '#787878'}
            textAlign={'center'}
          >
            It can take up to 2 minutes to render your artwork.
          </Text>
        </Box>
      </Box>
    </Box>
  );
}
