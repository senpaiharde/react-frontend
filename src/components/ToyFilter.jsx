import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux"
import { setFilter } from "../store/toySlice";
import { toyService } from "../services/toyService";
import { debounce, sortBy } from "lodash";

export function toyFilter() {
    const dispatch = useDispatch();
    const filterBy = useSelector(state => state.toy.filterBy);
    const [filter, SetLocalFilter] = useState(filterBy);
    const label = toyService.getLabels()

    const debouncedFilterByName = debounce(value => {
        dispatch(setFilter({ ...filter, name: value }));
    }, 300);

    useEffect(() => {
        return () => debouncedFilterByName.cancel();
    }, []);

    const handleNameChange = e => {
        SetLocalFilter(prevFilter => ({...prevFilter, name:e.target.value}));
        debouncedFilterByName(e.target.value)
    };

    const handleStockChange = e => {
        const stockValue = e.target.value === "all" ? undefined : e.target.value;
        dispatch(setFilter({...filter, inStock:stockValue}))
    };



    const handleLabelsChange = e => {
        const selectedLabels = Array.from(e.target.selectedOptions, option => option.value);
        dispatch(setFilter({...filter, label:selectedLabels}));
    }


    const handleSortChange = e => {
        dispatch(setFilter({...filter, sortBy: e.target.value}));
    };




    return()

}