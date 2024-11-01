import { SQLiteProvider } from "expo-sqlite";
import { inicializeDatabase } from "../database/inicializeDatabase";
import { Slot } from "expo-router";

export default function Layout(){
    return (
        <SQLiteProvider databaseName="AgendamentoDB.db" onInit={inicializeDatabase}>
            <Slot/>
        </SQLiteProvider>
    )
}