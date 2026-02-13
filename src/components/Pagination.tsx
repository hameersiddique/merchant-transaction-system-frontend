import { Box, Button, Typography, IconButton, useMediaQuery, useTheme } from '@mui/material';
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from '@mui/icons-material';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  maxVisible?: number;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  maxVisible = 5,
}: PaginationProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      let start = Math.max(2, currentPage - Math.floor(maxVisible / 2));
      let end = Math.min(totalPages - 1, start + maxVisible - 3);
      
      if (end === totalPages - 1) {
        start = Math.max(2, end - maxVisible + 3);
      }

      if (start > 2) {
        pages.push('...');
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (end < totalPages - 1) {
        pages.push('...');
      }

      pages.push(totalPages);
    }

    return pages;
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const pageNumbers = getPageNumbers();

  if (isMobile) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
        <Button
          variant="outlined"
          size="small"
          onClick={handlePrevious}
          disabled={currentPage === 1}
          sx={{ textTransform: 'none', borderRadius: 2 }}
        >
          Previous
        </Button>
        <Typography variant="body2" fontWeight={500}>
          {currentPage} / {totalPages}
        </Typography>
        <Button
          variant="outlined"
          size="small"
          onClick={handleNext}
          disabled={currentPage === totalPages}
          sx={{ textTransform: 'none', borderRadius: 2 }}
        >
          Next
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Typography variant="body2" color="text.secondary">
        Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Button
          variant="outlined"
          size="small"
          startIcon={<ChevronLeftIcon />}
          onClick={handlePrevious}
          disabled={currentPage === 1}
          sx={{ textTransform: 'none', borderRadius: 2 }}
        >
          Previous
        </Button>

        <Box sx={{ display: 'flex', gap: 0.5 }}>
          {pageNumbers.map((page, index) => (
            <Box key={index}>
              {page === '...' ? (
                <Typography
                  variant="body2"
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 40,
                    height: 40,
                    color: 'text.secondary',
                  }}
                >
                  ...
                </Typography>
              ) : (
                <IconButton
                  onClick={() => onPageChange(page as number)}
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: 2,
                    fontWeight: 600,
                    ...(currentPage === page
                      ? {
                          bgcolor: 'primary.main',
                          color: 'white',
                          '&:hover': {
                            bgcolor: 'primary.dark',
                          },
                        }
                      : {
                          bgcolor: 'transparent',
                          border: 1,
                          borderColor: 'divider',
                          '&:hover': {
                            bgcolor: 'action.hover',
                          },
                        }),
                  }}
                >
                  {page}
                </IconButton>
              )}
            </Box>
          ))}
        </Box>

        <Button
          variant="outlined"
          size="small"
          endIcon={<ChevronRightIcon />}
          onClick={handleNext}
          disabled={currentPage === totalPages}
          sx={{ textTransform: 'none', borderRadius: 2 }}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
}